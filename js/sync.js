// Progress sync service — pull on login, debounced push, offline queue
import { api } from './api.js';
import { store } from './store.js';
import { auth } from './auth.js';
import { showToast } from './components/toast.js';

const DEBOUNCE_MS = 3000;
let pushTimer = null;
let serverVersion = 0;
let syncing = false;

export function initSync() {
  // Pull on login
  window.addEventListener('auth:login', () => {
    pullProgress();
  });

  // Stop syncing on logout
  window.addEventListener('auth:logout', () => {
    serverVersion = 0;
    if (pushTimer) clearTimeout(pushTimer);
  });

  // Listen for progress changes
  window.addEventListener('progress:changed', () => {
    if (auth.isAuthenticated) {
      debouncedPush();
    }
  });

  // Push when coming back online
  window.addEventListener('online', () => {
    if (auth.isAuthenticated) {
      pushProgress();
    }
  });
}

async function pullProgress() {
  if (!auth.isAuthenticated || syncing) return;
  syncing = true;

  try {
    const data = await api.getProgress();
    serverVersion = data.version;

    // Merge server progress with local
    const localProgress = store.get('progress');
    const localScores = store.get('quizScores');

    const mergedProgress = {
      layersViewed: union(data.progress.layersViewed || [], localProgress.layersViewed || []),
      protocolsViewed: union(data.progress.protocolsViewed || [], localProgress.protocolsViewed || []),
      scenariosCompleted: union(data.progress.scenariosCompleted || [], localProgress.scenariosCompleted || []),
      quizzesCompleted: union(data.progress.quizzesCompleted || [], localProgress.quizzesCompleted || [])
    };

    const mergedScores = { ...data.quizScores };
    for (const [id, score] of Object.entries(localScores || {})) {
      if (!mergedScores[id] || score.score > mergedScores[id].score) {
        mergedScores[id] = score;
      }
    }

    // Update local store (suppress triggering push)
    store._skipSyncEvent = true;
    store.set('progress', mergedProgress);
    store.set('quizScores', mergedScores);
    store._skipSyncEvent = false;

    // Push merged data if different from server
    const hasChanges = JSON.stringify(mergedProgress) !== JSON.stringify(data.progress) ||
                       JSON.stringify(mergedScores) !== JSON.stringify(data.quizScores);
    if (hasChanges) {
      await pushProgress();
    }
  } catch (err) {
    console.error('Pull progress failed:', err);
  } finally {
    syncing = false;
  }
}

function debouncedPush() {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => pushProgress(), DEBOUNCE_MS);
}

async function pushProgress() {
  if (!auth.isAuthenticated || syncing) return;
  if (!navigator.onLine) return; // queue for later

  syncing = true;
  try {
    const data = await api.putProgress({
      progress: store.get('progress'),
      quizScores: store.get('quizScores'),
      baseVersion: serverVersion
    });
    serverVersion = data.version;

    // Update local with server-merged data
    store._skipSyncEvent = true;
    store.set('progress', data.progress);
    store.set('quizScores', data.quizScores);
    store._skipSyncEvent = false;
  } catch (err) {
    console.error('Push progress failed:', err);
  } finally {
    syncing = false;
  }
}

function union(a, b) {
  return [...new Set([...a, ...b])];
}

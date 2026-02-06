// Reactive state store with localStorage persistence
const STORAGE_KEY = 'osi-training-state';

const defaultState = {
  theme: 'light',
  quizScores: {},
  progress: {
    layersViewed: [],
    protocolsViewed: [],
    scenariosCompleted: [],
    quizzesCompleted: []
  },
  searchHistory: [],
  syncVersion: 0
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultState, ...JSON.parse(saved) };
    }
  } catch (e) {
    // ignore
  }
  return { ...defaultState };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

class Store {
  constructor() {
    this.state = loadState();
    this.listeners = new Map();
    this._skipSyncEvent = false;
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
    saveState(this.state);
    this._notify(key, value);
    // Dispatch sync event for progress/quiz changes
    if ((key === 'progress' || key === 'quizScores') && !this._skipSyncEvent) {
      window.dispatchEvent(new CustomEvent('progress:changed'));
    }
  }

  update(key, fn) {
    const newValue = fn(this.state[key]);
    this.set(key, newValue);
  }

  subscribe(key, fn) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(fn);
    return () => this.listeners.get(key).delete(fn);
  }

  _notify(key, value) {
    if (this.listeners.has(key)) {
      for (const fn of this.listeners.get(key)) {
        fn(value);
      }
    }
  }

  // Progress helpers
  markLayerViewed(layerNum) {
    this.update('progress', p => {
      if (!p.layersViewed.includes(layerNum)) {
        p.layersViewed = [...p.layersViewed, layerNum];
      }
      return { ...p };
    });
  }

  markProtocolViewed(id) {
    this.update('progress', p => {
      if (!p.protocolsViewed.includes(id)) {
        p.protocolsViewed = [...p.protocolsViewed, id];
      }
      return { ...p };
    });
  }

  markScenarioCompleted(id) {
    this.update('progress', p => {
      if (!p.scenariosCompleted.includes(id)) {
        p.scenariosCompleted = [...p.scenariosCompleted, id];
      }
      return { ...p };
    });
  }

  saveQuizScore(quizId, score, total) {
    this.update('quizScores', scores => ({
      ...scores,
      [quizId]: { score, total, date: Date.now() }
    }));
    this.update('progress', p => {
      if (!p.quizzesCompleted.includes(quizId)) {
        p.quizzesCompleted = [...p.quizzesCompleted, quizId];
      }
      return { ...p };
    });
  }

  getOverallProgress() {
    const p = this.state.progress;
    const totalItems = 7 + 25 + 5 + 8; // layers + protocols + scenarios + quizzes
    const completed = p.layersViewed.length + p.protocolsViewed.length +
                      p.scenariosCompleted.length + p.quizzesCompleted.length;
    return Math.round((completed / totalItems) * 100);
  }

  resetProgress() {
    this.set('progress', { ...defaultState.progress });
    this.set('quizScores', {});
  }
}

export const store = new Store();

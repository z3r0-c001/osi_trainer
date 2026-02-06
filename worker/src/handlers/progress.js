// Progress sync handlers: GET/PUT with merge
import { json, parseBody } from '../router.js';
import { queries } from '../db/queries.js';

export async function handleGetProgress(reqCtx) {
  const userId = reqCtx.user.id;
  const row = await queries.getProgress(reqCtx.env.DB, userId).first();

  if (!row) {
    return json({
      progress: {
        layersViewed: [],
        protocolsViewed: [],
        scenariosCompleted: [],
        quizzesCompleted: []
      },
      quizScores: {},
      version: 0
    });
  }

  return json({
    progress: JSON.parse(row.progress_data),
    quizScores: JSON.parse(row.quiz_scores),
    version: row.version
  });
}

export async function handlePutProgress(reqCtx) {
  const body = await parseBody(reqCtx.request);
  if (!body) return json({ error: 'Invalid request body' }, 400);

  const { progress, quizScores, baseVersion } = body;
  if (!progress) return json({ error: 'progress is required' }, 400);

  const userId = reqCtx.user.id;
  const existing = await queries.getProgress(reqCtx.env.DB, userId).first();

  let mergedProgress = progress;
  let mergedScores = quizScores || {};
  let newVersion = 1;

  if (existing) {
    const serverProgress = JSON.parse(existing.progress_data);
    const serverScores = JSON.parse(existing.quiz_scores);
    const serverVersion = existing.version;

    if (baseVersion !== undefined && baseVersion < serverVersion) {
      // Conflict — merge (union arrays, max quiz scores)
      mergedProgress = mergeProgress(serverProgress, progress);
      mergedScores = mergeQuizScores(serverScores, quizScores || {});
    }

    newVersion = serverVersion + 1;
  }

  await queries.upsertProgress(reqCtx.env.DB, {
    userId,
    progressData: JSON.stringify(mergedProgress),
    quizScores: JSON.stringify(mergedScores),
    version: newVersion
  }).run();

  return json({
    progress: mergedProgress,
    quizScores: mergedScores,
    version: newVersion
  });
}

// Merge two progress objects by unioning arrays
function mergeProgress(server, client) {
  return {
    layersViewed: union(server.layersViewed || [], client.layersViewed || []),
    protocolsViewed: union(server.protocolsViewed || [], client.protocolsViewed || []),
    scenariosCompleted: union(server.scenariosCompleted || [], client.scenariosCompleted || []),
    quizzesCompleted: union(server.quizzesCompleted || [], client.quizzesCompleted || [])
  };
}

// Merge quiz scores: keep highest score per quiz
function mergeQuizScores(server, client) {
  const merged = { ...server };
  for (const [quizId, clientScore] of Object.entries(client)) {
    if (!merged[quizId] || clientScore.score > merged[quizId].score) {
      merged[quizId] = clientScore;
    }
  }
  return merged;
}

function union(a, b) {
  return [...new Set([...a, ...b])];
}

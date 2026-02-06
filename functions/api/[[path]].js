// Cloudflare Pages Functions catch-all — re-exports worker
import worker from '../../worker/src/index.js';

export const onRequest = async (context) => {
  return worker.fetch(context.request, context.env, context);
};

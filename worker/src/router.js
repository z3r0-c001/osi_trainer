// Simple API route matcher for Cloudflare Workers
export class Router {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
    return this;
  }

  _add(method, pattern, ...handlers) {
    const paramNames = [];
    const regexStr = pattern.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    this.routes.push({
      method,
      regex: new RegExp(`^${regexStr}$`),
      paramNames,
      handlers
    });
    return this;
  }

  get(pattern, ...handlers) { return this._add('GET', pattern, ...handlers); }
  post(pattern, ...handlers) { return this._add('POST', pattern, ...handlers); }
  put(pattern, ...handlers) { return this._add('PUT', pattern, ...handlers); }
  delete(pattern, ...handlers) { return this._add('DELETE', pattern, ...handlers); }

  async handle(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Build context object
    const reqCtx = {
      request,
      env,
      ctx,
      url,
      path,
      method,
      params: {},
      query: Object.fromEntries(url.searchParams),
      user: null,
      session: null
    };

    // Run global middlewares
    for (const mw of this.middlewares) {
      const result = await mw(reqCtx);
      if (result instanceof Response) return result;
    }

    // Match route
    for (const route of this.routes) {
      if (route.method !== method && route.method !== 'ALL') continue;
      const match = path.match(route.regex);
      if (!match) continue;

      // Extract params
      const params = {};
      route.paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      reqCtx.params = params;

      // Run route handlers in sequence
      for (const handler of route.handlers) {
        const result = await handler(reqCtx);
        if (result instanceof Response) return result;
      }
    }

    return json({ error: 'Not found' }, 404);
  }
}

// Helper: return JSON response
export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
}

// Helper: parse JSON body safely
export async function parseBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

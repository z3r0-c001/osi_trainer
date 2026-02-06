// Hash-based SPA Router
export class Router {
  constructor() {
    this.routes = new Map();
    this.currentView = null;
    this.container = null;
    this.beforeHooks = [];
    this.afterHooks = [];
  }

  setContainer(el) {
    this.container = el;
  }

  on(pattern, handler) {
    // Convert :param patterns to regex
    const paramNames = [];
    const regexStr = pattern.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    this.routes.set(pattern, {
      regex: new RegExp(`^${regexStr}$`),
      paramNames,
      handler
    });
    return this;
  }

  beforeEach(fn) {
    this.beforeHooks.push(fn);
    return this;
  }

  afterEach(fn) {
    this.afterHooks.push(fn);
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/';
    for (const [pattern, route] of this.routes) {
      const match = hash.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = decodeURIComponent(match[i + 1]);
        });
        this._execute(route.handler, params, hash);
        return;
      }
    }
    // 404 - redirect to home
    this.navigate('/');
  }

  async _execute(handler, params, path) {
    for (const hook of this.beforeHooks) {
      const result = await hook(path, params);
      if (result === false) return;
    }

    if (this.currentView?.destroy) {
      this.currentView.destroy();
    }

    if (this.container) {
      this.container.innerHTML = '';
      this.currentView = await handler(this.container, params);
    }

    for (const hook of this.afterHooks) {
      await hook(path, params);
    }
  }

  start() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }
}

export const router = new Router();

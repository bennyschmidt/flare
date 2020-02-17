/*
 * Flare
 * 0.0.8
 */

/*
 * Events
 */

window.events = {};

/*
 * Renderer
 */

class Renderer {
  constructor(element) {
    this.element = element instanceof HTMLElement ? element : document.createElement('div');
  }

  render(state = {}, ...views) {
    return requestAnimationFrame(e => {
      this.element.innerHTML = Array.from(views).map(c => c(state)).join('\n');

      return state;
    });
  }
}

/*
 * ViewContainer
 */

class ViewContainer extends Renderer {
  constructor(element, rootPath) {
    const { hash } = window.location;

    super(element || document.querySelector('body'));

    window.get = this.fetch.bind(this);
    window.navigate = this.navigate.bind(this);
    window.setState = this.setState.bind(this);

    this.state = {
      route: hash ? hash.replace(/#/gi, '') : rootPath
    };

    this.views = [];

    this.navigate(`/${this.state.route}`);
  }

  async fetch(url, fetchParams) {
    if (fetchParams && typeof(fetchParams) === 'object') {
      fetchParams.body = JSON.stringify(fetchParams.body);
    }

    const res = await fetch(`${PATH}${url}`, fetchParams || null);

    const text = res ? await res.text() : '';
    const isValid = res.ok && text.length > 0;

    if (isValid) {
      return this.didFetch(JSON.parse(text), false);
    }

    return this.didFetch(BAD_REQUEST, true);
  }

  async navigate(path) {
    const res = await fetch(`${PATH}${path}`);
    const text = res ? await res.text() : '';
    const isValid = res.ok && text;
    const browserState = JSON.parse(text);

    window.history.replaceState(null, null, `${window.location.pathname}${path.replace(path.charAt(0), '#')}`);

    if (isValid) {
      return this.didNavigate(browserState, false);
    }

    return this.didNavigate(BAD_REQUEST, true);
  }

  async setState(state, req) {
    this.state = Object.assign(this.state || {}, state);

    if (req) {
      await this.fetch(req.route, {
        method: 'post',
        body: req
      });
    }

    this.render(this.state, ...this.views);

    return this.state;
  }
}

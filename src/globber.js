import Absolute, {blank} from './absolute';

export default class Globber {
  constructor (...paths) {
    Object.defineProperty(this, '_glob', {
      value: [],
      enumerable: true,
    });

    Object.defineProperty(this, 'glob', {
      get () {
        if (this._glob[0] === blank) {
          return [''];
        }
        return this._glob.map((abs, i) => {
          const negate = !(i % 2);
          return negate ? abs.path : abs.path.map(e => '!' + e);
        }).reduce((a1, a2) => {
          return a1.concat(a2);
        }, []);
      },
    });

    Object.defineProperty(this, 'negate', {
      get () {
        return !(this._glob.length % 2);
      },
    });

    paths.forEach(path => this.add(path));
  }

  add (_path) {
    const last = this._glob.length - 1;
    const negate = _path[0] === '!';

    const path = (negate ? _path.substring(1) : _path).replace(/\*\*$/, '*');

    if (last < 0) {
      if (!negate) {
        this._glob.push(new Absolute(path));
      } else {
        this._glob.push(blank);
      }
      return;
    }

    if (last === 0 && this._glob[0] === blank) {
      if (!negate) {
        this._glob[0] = new Absolute(path);
      }
      return;
    }

    if (this.negate === negate) {
      this._glob[last].add(path);
    } else {
      if (this._glob[last].remove(path)) {
        if (!this.addAgainIfEmpty(path, negate, last)) {
          this._glob.push(new Absolute(path));
          return;
        }
      }
    }

    this.addAgainIfEmpty(path, negate, last);
  }

  addAgainIfEmpty (path, negate, last) {
    if (this._glob[last].isEmpty() && last > -1) {
      this._glob.pop();
      this.add(negate ? '!' + path : path);
      return true;
    }
    return false;
  }
}

import Absolute from './absolute';

export default class Globber {
  constructor (_path, ...paths) {
    Object.defineProperty(this, '_glob', {
      value: [new Absolute(_path)],
      enumerable: true,
    });

    Object.defineProperty(this, '_negate', {
      value: _path[0] === '!',
      enumerable: true,
    });

    Object.defineProperty(this, 'glob', {
      get () {
        return this._glob.map((abs, i) => {
          const negate = i % 2 ? !this._negate : this._negate;
          return negate ? abs.path.map(e => '!' + e) : abs.path;
        }).reduce((a1, a2) => {
          return a1.concat(a2);
        }, []);
      },
    });

    Object.defineProperty(this, 'negate', {
      get () {
        return this._glob.length % 2 ? this._negate : !this._negate;
      },
    });

    paths.forEach(path => this.add(path));
  }

  add (_path) {
    const last = this._glob.length - 1;

    if (last < 0) {
      return;
    }

    const negate = _path[0] === '!';
    const path = negate ? _path.substring(1) : _path;

    if (this.negate === negate) {
      this._glob[last].add(path);
    } else {
      if (this._glob[last].remove(path)) {
        if (this._glob[last].isEmpty() && last !== 0) {
          this._glob.pop();
          this.add(_path);
        } else {
          this._glob.push(new Absolute(path));
        }
      } else {
        if (this._glob[last].isEmpty() && last !== 0) {
          this._glob.pop();
          this.add(_path);
        }
      }
    }
  }
}

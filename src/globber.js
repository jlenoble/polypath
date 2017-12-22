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
    const pos = this._glob.length - 1;
    const negate = _path[0] === '!';

    const path = (negate ? _path.substring(1) : _path).replace(/\*\*$/, '*');

    if (this._ReturnIfHandledEgdeCase(path, negate, pos)) {
      return;
    }

    this._addOrRemove(path, negate, pos);
  }

  _addAtPos (path, negate, pos) {
    const abs = this._glob[pos];
    const status = abs.getAcceptStatus(path);

    if (status.includes('filter')) {
      abs.filterOutElementsCoveredBy(path);
    }

    if (status.includes('adopt')) {
      abs.add(path);
      return true;
    }

    return false;
  }

  _removeAtPos (path, negate, pos) {
    if (this._glob[pos].remove(path)) {
      if (!this._addAgainIfEmpty(path, negate, pos)) {
        this._glob.push(new Absolute(path));
        return true;
      }
    }
    return false;
  }

  _addOrRemove (path, negate, pos) {
    if (this.negate === negate) {
      this._addAtPos(path, negate, pos);
    } else {
      this._removeAtPos(path, negate, pos);
    }

    this._addAgainIfEmpty(path, negate, pos);
  }

  _ReturnIfHandledEgdeCase (path, negate, pos) {
    if (pos < 0 && this._glob.length === 0) {
      if (!negate) {
        this._glob.push(new Absolute(path));
      } else {
        this._glob.push(blank);
      }
      return true;
    }

    if (pos === 0 && this._glob[0] === blank) {
      if (!negate) {
        this._glob[0] = new Absolute(path);
      }
      return true;
    }

    return false;
  }

  _addAgainIfEmpty (path, negate, pos) {
    if (this._glob[pos].isEmpty() && pos > -1) {
      if (pos === this._glob.length - 1) {
        this._glob.pop();
      }

      this.add(negate ? '!' + path : path, pos - 1);

      return this._mergeLeftAndRight(path, negate, pos);
    }
    return false;
  }

  _mergeLeftAndRight (path, negate, pos) {
    const _glob = this._glob;
    const len = _glob.length;

    if (pos - 1 < 0 || pos > len - 2) {
      return false;
    }

    _glob[pos - 1].add(_glob[pos + 1]);

    for (let i = pos + 2, l = len - 1; i < l; i++) {
      _glob[i - 2] = _glob[i];
    }

    _glob.splice(len - 2, 2);

    return true;
  }
}

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

  add (_path, _negate, _pos) {
    const pos = _pos || this._glob.length - 1;
    const negate = _negate || _path[0] === '!';
    const path = _negate !== undefined && _path ||
      (negate ? _path.substring(1) : _path).replace(/\*\*$/, '*');

    const glob = this._glob;
    const abs = glob[pos];

    if (!abs) {
      glob.push(blank);
      return this.add(path, negate, pos + 1);
    }

    if (abs === blank && !negate) {
      glob[pos] = new Absolute(path);
      return;
    }

    this._addOrRemove(path, negate, pos);
  }

  _addAtPos (path, negate, pos) {
    const abs = this._glob[pos];
    let status = abs.getStatus(path, 'add');

    if (status.includes('filter')) {
      abs.filterOutElementsCoveredBy(path);
    }

    if (status.includes('adopt')) {
      abs.add(path);
    }

    status = abs.getStatus(path, 'added');

    if (status === 'empty') {
      this._glob.pop();
      this.add(path, negate, pos - 1);
    }
  }

  _removeAtPos (path, negate, pos) {
    const abs = this._glob[pos];
    let status;

    abs.filterOutElementsCoveredBy(path);

    if (abs.covers(path) || abs.mayNotBeDroppable(path)) {
      this._glob.push(new Absolute(path));
      return;
    }

    status = abs.getStatus(path, 'removed');

    if (status === 'empty') {
      this._glob.pop();
      this.add(path, negate, pos - 1);
    }
  }

  _addOrRemove (path, negate, pos) {
    if (this.negate === negate) {
      this._addAtPos(path, negate, pos);
    } else {
      this._removeAtPos(path, negate, pos);
    }
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

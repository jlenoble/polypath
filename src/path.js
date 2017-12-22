import path from 'path';
import glob from 'glob';
import {absolute} from './absolute';

export default class Path {
  constructor (_path) {
    const negate = _path[0] === '!';

    Object.defineProperties(this, {
      _path: {
        value: absolute(negate ? _path.substring(1) : _path),
        enumerable: true,
      },
      path: {
        get () {
          return this.negate ? '!' + this._path : this._path;
        },
      },
      negate: {
        value: negate,
      },
    });
  }

  rebase (base1, base2) {
    const defaultbase = process.cwd();

    const _oldbase = base2 ? base1 : defaultbase;
    const _newbase = base2 || base1;

    const oldbase = _oldbase instanceof Path ? _oldbase._path :
      _oldbase || defaultbase;
    const newbase = _newbase instanceof Path ? _newbase._path :
      _newbase || defaultbase;

    const reldir = path.relative(oldbase, newbase);
    const relpath = path.relative(oldbase, this._path);

    if (this.negate) {
      return new Path('!' + path.join(oldbase, reldir, relpath));
    }

    return new Path(path.join(oldbase, reldir, relpath));
  }

  relative (_base) {
    const base = _base instanceof Path ? _base._path : _base || process.cwd();
    return this.negate ? '!' + path.relative(base, this._path) :
      path.relative(base, this._path);
  }

  resolve () {
    return new Promise((resolve, reject) => {
      glob(this._path, (err, files) => {
        if (err) {
          return reject(err);
        }
        resolve(files.map(file => this.negate ? '!' + file : file));
      });
    });
  }
}

const proto = Path.prototype;

['dirname', 'basename', 'extname'].forEach(key => {
  proto[key] = function () {
    return path[key](this.path);
  };
});

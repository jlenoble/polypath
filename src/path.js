import path from 'path';
import glob from 'glob';
import {absolute} from './absolute';

export default class Path {
  constructor (_path) {
    Object.defineProperty(this, 'path', {
      value: absolute(_path),
      enumerable: true,
    });
  }

  rebase (base1, base2) {
    const defaultbase = process.cwd();

    const _oldbase = base2 ? base1 : defaultbase;
    const _newbase = base2 || base1;

    const oldbase = _oldbase instanceof Path ? _oldbase.path :
      _oldbase || defaultbase;
    const newbase = _newbase instanceof Path ? _newbase.path :
      _newbase || defaultbase;

    const reldir = path.relative(oldbase, newbase);
    const relpath = path.relative(oldbase, this.path);

    return new Path(path.join(oldbase, reldir, relpath));
  }

  relative (_base) {
    const base = _base instanceof Path ? _base.path : _base || process.cwd();
    return path.relative(base, this.path);
  }

  resolve () {
    return new Promise((resolve, reject) => {
      glob(this.path, (err, files) => {
        if (err) {
          return reject(err);
        }
        resolve(files);
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

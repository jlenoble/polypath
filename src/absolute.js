import path from 'path';
import untildify from 'untildify';
import minimatch from 'minimatch';

export const absolute = arg => {
  switch (arg[0]) {
  case '/':
    return arg;
  case '~':
    return untildify(arg);
  case '!':
    return '!' + absolute(arg.substring(1));
  default:
    return path.resolve(arg);
  }
};

const _path = Symbol();

export default class Absolute {
  constructor (paths) {
    this[_path] = Array.isArray(paths) ? paths.map(
      path => new SingleAbsolute(path)) : [new SingleAbsolute(paths)];

    Object.defineProperty(this, 'path', {
      get () {
        return this[_path].map(abs => abs.path).sort();
      },
    });
  }

  covers (path) {
    return this[_path].some(abs => abs.covers(path));
  }

  isCoveredBy (path) {
    return this[_path].every(abs => abs.isCoveredBy(path));
  }

  add (path) {
    const len = this[_path].length;
    this[_path] = this[_path].filter(abs => !abs.isCoveredBy(path));

    if (this[_path].length !== len) {
      this[_path].push(new SingleAbsolute(path));
      return;
    }

    if (!this.covers(path)) {
      this[_path].push(new SingleAbsolute(path));
    }
  }
}

class SingleAbsolute {
  constructor (path) {
    Object.defineProperty(this, 'path', {
      value: absolute(path),
    });
  }

  covers (path) {
    return minimatch(absolute(path), this.path);
  }

  isCoveredBy (path) {
    return new Absolute(path).covers(this.path);
  }
}

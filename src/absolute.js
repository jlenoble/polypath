import path from 'path';
import glob from 'glob';
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

  isEmpty () {
    return !this[_path].length;
  }

  hasMagic () {
    return this[_path].some(abs => abs.hasMagic());
  }

  covers (path) {
    return this[_path].some(abs => abs.covers(path));
  }

  isCoveredBy (path) {
    return this[_path].every(abs => abs.isCoveredBy(path));
  }

  indexOf (path) {
    return this[_path].findIndex(abs => abs.path === absolute(path));
  }

  add (path) {
    // Returns true if path was adopted (superseded some, or was distinct)
    const len = this[_path].length;
    this[_path] = this[_path].filter(abs => !abs.isCoveredBy(path));

    if (this[_path].length !== len) {
      this[_path].push(new SingleAbsolute(path));
      return true;
    }

    if (!this.covers(path)) {
      this[_path].push(new SingleAbsolute(path));
      return true;
    }

    return false;
  }

  remove (path) {
    // Return false if path can be discarded (cancels out with something)
    const index = this.indexOf(path);

    if (index !== -1) {
      this[_path].splice(index, 1);
      return false;
    }

    this[_path] = this[_path].filter(abs => !abs.isCoveredBy(path));

    if (this.covers(path)) {
      return true;
    }

    if (this.hasMagic() && glob.hasMagic(path)) {
      return true;
    }

    return false;
  }
}

class SingleAbsolute {
  constructor (path) {
    Object.defineProperty(this, 'path', {
      value: absolute(path),
    });
  }

  hasMagic () {
    return glob.hasMagic(this.path);
  }

  covers (path) {
    return minimatch(absolute(path), this.path);
  }

  isCoveredBy (path) {
    return new Absolute(path).covers(this.path);
  }
}

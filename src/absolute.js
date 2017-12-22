import path from 'path';
import glob from 'glob';
import untildify from 'untildify';
import minimatch from 'minimatch';

export const absolute = _arg => {
  const arg = _arg.trim();

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

const split = str => {
  return str.replace(/([^\\])\//g, '$1\u000B').split('\u000B');
};

const _path = Symbol();

export default class Absolute {
  constructor (paths) {
    this[_path] = Array.isArray(paths) ? paths.map(
      path => new SingleAbsolute(path)) : [new SingleAbsolute(paths)];

    Object.defineProperties(this, {
      path: {
        get () {
          return this[_path].map(abs => abs.path).sort();
        },
      },

      length: {
        get () {
          return this[_path].length;
        },
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
    // Return true if adopts path
    if (path instanceof (Absolute)) {
      throw new Error('toto');
      return;
    }

    const len = this[_path].length;
    this[_path] = this[_path].filter(abs => !abs.isCoveredBy(path));

    if (this[_path].length !== len) {
      if (this[_path].length > 0) {
        this[_path].push(new SingleAbsolute(path));
        return true;
      }
      return false;
    }

    if (!this.covers(path)) {
      this[_path].push(new SingleAbsolute(path));
      return true;
    }

    return false;
  }

  remove (path) {
    // Return false if path can be discarded (cancels out with something)
    this[_path] = this[_path].filter(abs => !abs.isCoveredBy(path));

    if (this.covers(path)) {
      return true;
    }

    const dirs = split(absolute(path));
    const magicIndex = dirs.findIndex(dir => glob.hasMagic(dir));

    return this[_path].some(abs => {
      if (magicIndex !== -1 && abs.magicIndex !== -1) {
        if (magicIndex !== abs.magicIndex) {
          return false;
        }

        const dirs0 = split(abs.path);
        const last = dirs0.length - 1;

        for (let i = 0; i < last; i++) {
          if (dirs[i] !== dirs0[i]) {
            return false;
          }
        }

        return dirs[last] !== dirs0[last]; // basename, not dirname
      }

      return false;
    });
  }
}

class SingleAbsolute {
  constructor (_path) {
    const path = absolute(_path);

    Object.defineProperties(this, {
      path: {
        value: path,
      },

      magicIndex: {
        value: split(path).findIndex(dir => glob.hasMagic(dir)),
      },
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

export const blank = new Absolute('');

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

  covers (path, strict = false) {
    return this[_path].some(abs => abs.covers(path, strict));
  }

  isCoveredBy (path, strict = false) {
    return this[_path].every(abs => abs.isCoveredBy(path, strict));
  }

  hasElementsCoveredBy (path, strict = false) {
    return this[_path].some(abs => abs.isCoveredBy(path, strict));
  }

  mayNotBeDroppable (path) {
    return this[_path].some(abs => abs.mayNotBeDroppable(path));
  }

  indexOf (path) {
    return this[_path].findIndex(abs => abs.path === absolute(path));
  }

  getStatus (path, status) {
    switch (status) {
    case 'add':
      if (this.hasElementsCoveredBy(path)) {
        if (this.hasElementsCoveredBy(path, true)) {
          return 'filter&adopt';
        }

        return 'filter';
      }

      if (this.covers(path)) {
        return 'drop';
      }

      return 'adopt';

    case 'added': case 'removed':
      if (this.isEmpty()) {
        return 'empty';
      }
      break;

    default:
      throw new Error(`Undefined status ${status}`);
    }
  }

  filterOutElementsCoveredBy (path) {
    this[_path] = this[_path].filter(abs => !abs.isCoveredBy(path));
  }

  add (path) {
    if (this[_path].length > 0) {
      this[_path].push(new SingleAbsolute(path));
    }
  }
}

class SingleAbsolute {
  constructor (_path) {
    const path = absolute(_path);
    const dirs = split(path);

    Object.defineProperties(this, {
      path: {
        value: path,
      },

      magicIndex: {
        value: dirs.findIndex(dir => glob.hasMagic(dir)),
      },

      dirs: {
        value: dirs,
      },
    });
  }

  hasMagic () {
    return glob.hasMagic(this.path);
  }

  covers (_path, strict = false) {
    const path = absolute(_path);

    let yes = minimatch(path, this.path);

    if (yes && strict) {
      yes = !minimatch(this.path, path);
    }

    return yes;
  }

  isCoveredBy (path, strict = false) {
    return new Absolute(path).covers(this.path, strict);
  }

  mayNotBeDroppable (path) {
    // Use this when removing covered globs.

    // In remove mode, explicit path is dropped.
    // If it has patterns, it is still dropped if this.path doesn't have any.
    // But if both have patterns, they might at some point overlap.
    if (this.magicIndex === -1 || !glob.hasMagic(path)) {
      return false;
    }

    // Then it depends on what dirs they share
    const dirs = split(absolute(path));
    const magicIndex = dirs.findIndex(dir => glob.hasMagic(dir));

    // If pattern indices are different, then the (non-)overlap is obvious
    // and minimatch's answer in 'covers' method is enough
    if (magicIndex !== this.magicIndex) {
      return false;
    }

    const dirs0 = this.dirs;
    const last = dirs0.length - 1;

    // minimatch has answered false, but it was due only to basenames.
    // Check all dirs up to magic. They have no pattern, so it's obvious
    for (let i = 0; i < last; i++) {
      if (dirs[i] !== dirs0[i]) {
        return false;
      }
    }

    // Path is fully shared up to magic, may not drop if not identical
    return dirs[last] !== dirs0[last];
  }
}

export const blank = new Absolute('');

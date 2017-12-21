import glob from 'glob';
import minimatch from 'minimatch';
import {absolute} from './absolute';

const _contains = (s1, s2, split) => {
  switch (split) {
  case undefined:
    split = '/'; // eslint-disable-line no-param-reassign
    break;
  case '/':
    split = '*'; // eslint-disable-line no-param-reassign
    break;
  default:
    split = null; // eslint-disable-line no-param-reassign
    break;
  }

  if (!glob.hasMagic(s2)) {
    return minimatch(s2, s1);
  }

  const a1 = s1.split(split);
  const a2 = s2.split(split);

  return a1.every((el, i) => {
    if (!glob.hasMagic(a2[i])) {
      return minimatch(a2[i], el);
    }

    return _contains(el, a2[i], split);
  });
};

const contains = (s1, s2) => {
  if (!s1.includes('**')) {
    if (s2.includes('**')) {
      return false;
    }

    return _contains(s1, s2);
  }

  const [a1, b1] = s1.split('/**/');
  const [a2, b2] = s2.split('/**/');

  const arrayA1 = a1.split('/');
  const arrayA2 = a2.split('/');
  const arrayB1 = b1.split('/');
  const arrayB2 = b2 ? b2.split('/'): arrayA2;

  if (arrayA1.length > arrayA2.length || arrayB1.length > arrayB2.length) {
    return false;
  }

  return _contains(a1, arrayA2.slice(0, arrayA1.length).join('/')) &&
    _contains(b1, arrayB2.slice(arrayB2.length - arrayB1.length).join('/'));
};

const reduceMagic = (globs, glb) => {
  let drop = false;

  // First remove files matching glb
  let reducedGlobs = globs.filter(gg => {
    if (glob.hasMagic(gg)) {
      const _drop = contains(glb, gg);
      drop |= contains(gg, glb);

      return !_drop;
    }

    return !minimatch(gg, glb);
  });

  if (!drop) {
    reducedGlobs.push(glb);
  }

  return reducedGlobs.sort();
};

const reduce = (globs, glb) => {
  if (globs.includes(glb)) {
    // glb already in globs, do nothing
    return globs;
  }

  if (glob.hasMagic(glb)) {
    return reduceMagic(globs, glb);
  }

  // No magic, check if glb matches something
  if (!globs.some(gg => {
    return minimatch(glb, gg);
  })) {
    globs.push(glb);
    return globs.sort();
  }

  return globs;
};

export default class Globber {
  constructor (_path, ...paths) {
    Object.defineProperty(this, '_glob', {
      value: [[absolute(_path)]],
      enumerable: true,
    });

    Object.defineProperty(this, '_negate', {
      value: _path[0] === '!',
      enumerable: true,
    });

    Object.defineProperty(this, 'glob', {
      get () {
        return this._glob.map((el, i) => {
          const negate = i%2 ? !this._negate : this._negate;
          return negate ? el.map(e => '!' + e) : el;
        }).reduce((a1, a2) => {
          return a1.concat(a2);
        });
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
    const negate = _path[0] === '!';
    const path = absolute(negate ? _path.substring(1) : _path);

    if (this.negate === negate) {
      this._glob[this._glob.length - 1] = reduce(
        this._glob[this._glob.length - 1], path);
    } else {
      this._glob.push([path]);
    }
  }
}

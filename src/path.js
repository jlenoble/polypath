import path from 'path';
import untildify from 'untildify';

class Path {
  constructor (_path) {
    Object.defineProperty(this, 'path', {
      value: path.resolve(untildify(_path)),
      enumerable: true,
    });
  }

  rebase (_base) {
    const cwd = process.cwd();
    const base = _base instanceof Path ? _base.path : _base || cwd;
    const reldir = path.relative(cwd, base);
    const relpath = path.relative(cwd, this.path);
    return new Path(path.join(cwd, reldir, relpath));
  }

  relative (_base) {
    const base = _base instanceof Path ? _base.path : _base || process.cwd();
    return path.relative(base, this.path);
  }
}

const proto = Path.prototype;

['dirname', 'basename', 'extname'].forEach(key => {
  proto[key] = function () {
    return path[key](this.path);
  };
});

export default Path;

import path from 'path';
import untildify from 'untildify';

class Path {
  constructor (_path) {
    Object.defineProperty(this, 'path', {
      value: path.resolve(untildify(_path)),
      enumerable: true,
    });
  }

  relative (_base) {
    const base = _base instanceof Path ? _base.path : _base;
    return path.relative(base || process.cwd(), this.path);
  }
}

const proto = Path.prototype;

['dirname', 'basename', 'extname'].forEach(key => {
  proto[key] = function () {
    return path[key](this.path);
  };
});

export default Path;

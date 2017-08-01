import path from 'path';
import untildify from 'untildify';
import Path from './path';
import {PolytonFactory} from 'polyton';

const PolyPath = PolytonFactory(Path, ['literal'], [{
  unordered: true, unique: true}], {
  preprocess: function (args) {
    return args.reduce((array, [_arg]) => {
      const _args = _arg instanceof Path ? [_arg.path] :
        _arg instanceof PolyPath.BasePolyton ? _arg.paths : [_arg];
      return array.concat(_args.map(arg => [path.resolve(untildify(arg))]));
    }, []);
  },
  properties: {
    paths: {
      get () {
        return this.map(p => p.path);
      },
    },
  },
  extend: {
    basenames () {
      return this.map(p => p.basename());
    },
    dirnames () {
      return this.map(p => p.dirname());
    },
    extnames () {
      return this.map(p => p.extname());
    },

    relative (base) {
      return this.map(p => p.relative(base));
    },
  },
});

export default PolyPath;
export {Path};

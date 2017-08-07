import path from 'path';
import untildify from 'untildify';
import Path from './path';
import {PolytonFactory} from 'polyton';
import glob from 'glob';
import minimatch from 'minimatch';

const PolyPath = PolytonFactory(Path, ['literal'], [{
  unordered: true, unique: true}], {
  preprocess: function (args) {
    const paths = args.reduce((array, [_arg]) => {
      const _args = _arg instanceof Path ? [_arg.path] :
        _arg instanceof PolyPath.BasePolyton ? _arg.paths : [_arg];
      return array.concat(_args.map(arg => [path.resolve(untildify(arg))]));
    }, []).map(([file]) => file);

    const globs = paths.filter(file => glob.hasMagic(file));
    const noglobs = paths.filter(file => !glob.hasMagic(file));

    return globs.concat(noglobs.filter(g => {
      return !globs.some(gg => {
        return minimatch(g, gg);
      });
    })).sort().map(file => [file]);
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

    rebase (base1, base2) {
      return new PolyPath(...this.map(p => p.rebase(base1, base2)));
    },

    relative (base) {
      return this.map(p => p.relative(base));
    },
  },
});

export default PolyPath;
export {Path};

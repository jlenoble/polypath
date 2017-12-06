import path from 'path';
import untildify from 'untildify';
import Path from './path';
import {PolytonFactory} from 'polyton';
import glob from 'glob';
import minimatch from 'minimatch';

const PolyPath = PolytonFactory(Path, ['literal'], [{
  unordered: true, unique: true}], {
  preprocess: function (args) {
    // Extract all paths from args
    const paths = args.reduce((array, [_arg]) => {
      const _args = _arg instanceof Path ? [_arg.path] :
        _arg instanceof PolyPath.BasePolyton ? _arg.paths : [_arg];
      return array.concat(_args.map(arg => [path.resolve(untildify(arg))]));
    }, []).map(([file]) => file);

    // Distinguish between plain paths and patterns
    let globs = paths.filter(file => glob.hasMagic(file));

    // Remove plain paths matched by any present pattern
    if (paths.length !== globs.length) {
      const noglobs = paths.filter(file => !glob.hasMagic(file));

      globs = globs.concat(noglobs.filter(g => {
        return !globs.some(gg => {
          return minimatch(g, gg);
        });
      }));
    }

    // Merge a/*b into a/**/*b when both found
    if (globs.length > 1) {
      const globstars = globs.filter(g => g.includes('**/'));
      const noglobstars = globs.filter(g => !g.includes('**/'));

      globs = globstars.concat(noglobstars.filter(g => {
        return !globstars.some(gg => {
          return gg.split('**/').join('') === g;
        });
      }));
    }

    // Order to ensure unicity
    return globs.sort().map(file => [file]);
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

    resolve () {
      return Promise.all(this.map(p => p.resolve())).then(files => {
        let last;
        return files.reduce((array, files) => {
          return array.concat(files);
        }, []).sort().filter(file => {
          const keep = last !== file;
          last = file;
          return keep;
        });
      });
    },
  },
});

const rebase = (files, base1, base2) => new PolyPath(
  ...(Array.isArray(files) ? files : [files])).rebase(base1, base2).paths;
const resolve = files => new PolyPath(
  ...(Array.isArray(files) ? files : [files])).resolve();

export default PolyPath;
export {Path, rebase, resolve};

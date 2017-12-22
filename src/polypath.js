import {absolute} from './absolute';
import Path from './path';
import Globber from './globber';
import {PolytonFactory} from 'polyton';

const PolyPath = PolytonFactory(Path, ['literal'], {
  customArgs: [
    [String, {
      convert (arg) {
        return absolute(arg);
      },
    }],
  ],
}, {
  unordered: true,
  unique: true,

  spread (arg) {
    return arg.paths;
  },

  customArgs: [
    [Path, {
      convert (arg) {
        return arg.path;
      },
    }],
    [String, {
      convert (arg) {
        return absolute(arg);
      },
    }],
  ],

  preprocess: function (paths) {
    return new Globber(...paths).glob;
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
      return Promise.all(this.map(p => p.resolve())).then(
        files => new Globber(...files.reduce((f1, f2) => {
          return f1.concat(f2);
        })).glob);
    },
  },
});

const rebase = (files, base1, base2) => new PolyPath(...files)
  .rebase(base1, base2).paths;

const resolve = files => new PolyPath(...files).resolve();

const split = (...glb) => {
  const glob = glb.reduce((a1, a2) => a1.concat(a2), []);
  return [
    glob.filter(g => !g.match(/^!/)),
    glob.filter(g => g.match(/^!/)).map(g => g.substring(1)),
  ];
};

const filter = ([allFiles, dropFiles]) => allFiles.filter(
  file => !dropFiles.some(f => file === f));

const rebaseGlob = (glb, base1, base2) => {
  const [f1, f2] = split(glb)
    .map(g => g.length && rebase(g, base1, base2) || []);
  return f1.concat(f2.map(f => '!' + f));
};

const resolveGlob = (...glb) => Promise.all(split(...glb)
  .map(g => g.length && resolve(g) || Promise.resolve(g))).then(filter);

const reduceGlob = (...glb) => new PolyPath(...glb).paths;

export default PolyPath;
export {Path, rebaseGlob, resolveGlob, reduceGlob};

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveGlob = exports.rebaseGlob = exports.Path = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _polyton = require('polyton');

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _path3 = require('path');

var _path4 = _interopRequireDefault(_path3);

var _untildify = require('untildify');

var _untildify2 = _interopRequireDefault(_untildify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PolyPath = (0, _polyton.PolytonFactory)(_path2.default, ['literal'], {
  customArgs: [[String, {
    convert: function convert(arg) {
      return _path4.default.resolve((0, _untildify2.default)(arg));
    }
  }]]
}, {
  unordered: true,
  unique: true,

  spread: function spread(arg) {
    return arg.paths;
  },


  customArgs: [[_path2.default, {
    convert: function convert(arg) {
      return arg.path;
    }
  }], [String, {
    convert: function convert(arg) {
      return _path4.default.resolve((0, _untildify2.default)(arg));
    }
  }]],

  preprocess: function preprocess(paths) {
    // Distinguish between plain paths and patterns
    var globs = paths.filter(function (file) {
      return _glob2.default.hasMagic(file);
    });

    // Remove plain paths matched by any present pattern
    if (paths.length !== globs.length) {
      var noglobs = paths.filter(function (file) {
        return !_glob2.default.hasMagic(file);
      });

      globs = globs.concat(noglobs.filter(function (g) {
        return !globs.some(function (gg) {
          return (0, _minimatch2.default)(g, gg);
        });
      }));
    }

    // Merge a/*b into a/**/*b when both are found
    if (globs.length > 1) {
      var globstars = globs.filter(function (g) {
        return g.includes('**/');
      });
      var noglobstars = globs.filter(function (g) {
        return !g.includes('**/');
      });

      globs = globstars.concat(noglobstars.filter(function (g) {
        return !globstars.some(function (gg) {
          return gg.split('**/').join('') === g;
        });
      }));
    }

    // Order to ensure unicity
    return globs.sort();
  },

  properties: {
    paths: {
      get: function get() {
        return this.map(function (p) {
          return p.path;
        });
      }
    }
  },

  extend: {
    basenames: function basenames() {
      return this.map(function (p) {
        return p.basename();
      });
    },
    dirnames: function dirnames() {
      return this.map(function (p) {
        return p.dirname();
      });
    },
    extnames: function extnames() {
      return this.map(function (p) {
        return p.extname();
      });
    },
    rebase: function rebase(base1, base2) {
      return new (Function.prototype.bind.apply(PolyPath, [null].concat(_toConsumableArray(this.map(function (p) {
        return p.rebase(base1, base2);
      })))))();
    },
    relative: function relative(base) {
      return this.map(function (p) {
        return p.relative(base);
      });
    },
    resolve: function resolve() {
      return Promise.all(this.map(function (p) {
        return p.resolve();
      })).then(function (files) {
        var last = void 0;
        return files.reduce(function (array, files) {
          return array.concat(files);
        }, []).sort().filter(function (file) {
          var keep = last !== file;
          last = file;
          return keep;
        });
      });
    }
  }
});

var rebase = function rebase(files, base1, base2) {
  return new (Function.prototype.bind.apply(PolyPath, [null].concat(_toConsumableArray(files))))().rebase(base1, base2).paths;
};

var resolve = function resolve(files) {
  return new (Function.prototype.bind.apply(PolyPath, [null].concat(_toConsumableArray(files))))().resolve();
};

var split = function split() {
  for (var _len = arguments.length, glb = Array(_len), _key = 0; _key < _len; _key++) {
    glb[_key] = arguments[_key];
  }

  var glob = glb.reduce(function (a1, a2) {
    return a1.concat(a2);
  }, []);
  return [glob.filter(function (g) {
    return !g.match(/^!/);
  }), glob.filter(function (g) {
    return g.match(/^!/);
  }).map(function (g) {
    return g.substring(1);
  })];
};

var filter = function filter(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      allFiles = _ref2[0],
      dropFiles = _ref2[1];

  return allFiles.filter(function (file) {
    return !dropFiles.some(function (f) {
      return file === f;
    });
  });
};

var rebaseGlob = function rebaseGlob(glb, base1, base2) {
  var _split$map = split(glb).map(function (g) {
    return g.length && rebase(g, base1, base2) || [];
  }),
      _split$map2 = _slicedToArray(_split$map, 2),
      f1 = _split$map2[0],
      f2 = _split$map2[1];

  return f1.concat(f2.map(function (f) {
    return '!' + f;
  }));
};

var resolveGlob = function resolveGlob() {
  return Promise.all(split.apply(undefined, arguments).map(function (g) {
    return g.length && resolve(g) || Promise.resolve(g);
  })).then(filter);
};

exports.default = PolyPath;
exports.Path = _path2.default;
exports.rebaseGlob = rebaseGlob;
exports.resolveGlob = resolveGlob;
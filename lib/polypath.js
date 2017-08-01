'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _untildify = require('untildify');

var _untildify2 = _interopRequireDefault(_untildify);

var _path3 = require('./path');

var _path4 = _interopRequireDefault(_path3);

var _polyton = require('polyton');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PolyPath = (0, _polyton.PolytonFactory)(_path4.default, ['literal'], [{
  unordered: true, unique: true }], {
  preprocess: function preprocess(args) {
    return args.reduce(function (array, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          _arg = _ref2[0];

      var _args = _arg instanceof _path4.default ? [_arg.path] : _arg instanceof PolyPath.BasePolyton ? _arg.paths : [_arg];
      return array.concat(_args.map(function (arg) {
        return [_path2.default.resolve((0, _untildify2.default)(arg))];
      }));
    }, []).sort(function (_ref3, _ref4) {
      var _ref6 = _slicedToArray(_ref3, 1),
          a1 = _ref6[0];

      var _ref5 = _slicedToArray(_ref4, 1),
          a2 = _ref5[0];

      return a1 < a2 ? -1 : a1 === a2 ? 0 : 1;
    });
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
    }
  }
});

exports.default = PolyPath;
exports.Path = _path4.default;
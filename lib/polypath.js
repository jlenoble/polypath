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

var PolyPath = (0, _polyton.PolytonFactory)(_path4.default, ['literal'], [{ unordered: true }], {
  preprocess: function preprocess(args) {
    return args.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          arg = _ref2[0];

      return [_path2.default.resolve((0, _untildify2.default)(arg))];
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
    }
  }
});

exports.default = PolyPath;
exports.Path = _path4.default;
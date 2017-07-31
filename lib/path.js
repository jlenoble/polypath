'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _untildify = require('untildify');

var _untildify2 = _interopRequireDefault(_untildify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function Path(_path) {
  _classCallCheck(this, Path);

  Object.defineProperty(this, 'path', {
    value: _path3.default.resolve((0, _untildify2.default)(_path)),
    enumerable: true
  });
};

var proto = Path.prototype;

['dirname', 'basename', 'extname'].forEach(function (key) {
  proto[key] = function () {
    return _path3.default[key](this.path);
  };
});

exports.default = Path;
module.exports = exports['default'];
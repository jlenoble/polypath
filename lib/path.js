'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _untildify = require('untildify');

var _untildify2 = _interopRequireDefault(_untildify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function () {
  function Path(_path) {
    _classCallCheck(this, Path);

    Object.defineProperty(this, 'path', {
      value: _path3.default.resolve((0, _untildify2.default)(_path)),
      enumerable: true
    });
  }

  _createClass(Path, [{
    key: 'rebase',
    value: function rebase(base1, base2) {
      var defaultbase = process.cwd();

      var _oldbase = base2 ? base1 : defaultbase;
      var _newbase = base2 ? base2 : base1;

      var oldbase = _oldbase instanceof Path ? _oldbase.path : _oldbase || defaultbase;
      var newbase = _newbase instanceof Path ? _newbase.path : _newbase || defaultbase;

      var reldir = _path3.default.relative(oldbase, newbase);
      var relpath = _path3.default.relative(oldbase, this.path);

      return new Path(_path3.default.join(oldbase, reldir, relpath));
    }
  }, {
    key: 'relative',
    value: function relative(_base) {
      var base = _base instanceof Path ? _base.path : _base || process.cwd();
      return _path3.default.relative(base, this.path);
    }
  }, {
    key: 'resolve',
    value: function resolve() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        (0, _glob2.default)(_this.path, function (err, files) {
          if (err) {
            return reject(err);
          }
          resolve(files);
        });
      });
    }
  }]);

  return Path;
}();

var proto = Path.prototype;

['dirname', 'basename', 'extname'].forEach(function (key) {
  proto[key] = function () {
    return _path3.default[key](this.path);
  };
});

exports.default = Path;
module.exports = exports['default'];
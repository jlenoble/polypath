import {expect} from 'chai';
import path from 'path';
import Path from '../src/path';
import PolyPath from '../src/polypath';

describe('Testing resolve method', function () {
  it(`Resolving with Path`, function () {
    const p = new Path('src/*.js');

    return p.resolve().then(files => {
      expect(files).to.eql(['path.js', 'polypath.js'].map(f => {
        return path.join(process.cwd(), 'src', f);
      }));
    });
  });

  it(`Resolving with PolyPath`, function () {
    const p = new PolyPath('src/*.js', 'gulpfile.babel.js');

    return p.resolve().then(files => {
      expect(files).to.eql(['gulpfile.babel.js', 'src/path.js',
        'src/polypath.js'].map(f => path.join(process.cwd(), f)));
    });
  });

  it(`Resolving with PolyPath - overlapping`, function () {
    const p = new PolyPath('src/poly*.js', 'src/*path.js', 'src/*.js');

    return p.resolve().then(files => {
      expect(files).to.eql(['src/path.js', 'src/polypath.js']
        .map(f => path.join(process.cwd(), f)));
    });
  });
});

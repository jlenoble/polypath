import {expect} from 'chai';
import path from 'path';
import PolyPath from '../src/polypath';

describe('Testing PolyPath', function () {
  it(`Reducing globs: plain paths matched by patterns`, function () {
    const p1 = new PolyPath(path.join(process.cwd(), 'src/polypath.js'),
      'src/**/*.js', 'src/path.js');
    const p2 = new PolyPath('src/**/*.js');

    const p3 = new PolyPath('src/*path.js', 'src/path.js', 'src/polypath.js');
    const p4 = new PolyPath('src/*path.js');

    expect(p1).to.equal(p2);
    expect(p3).to.equal(p4);

    expect(p2).not.to.equal(p4);
  });

  it(`Reducing globs: a/*b matched by a/**/*b`, function () {
    const p1 = new PolyPath(path.join(process.cwd(), 'src/*.js'),
      'src/**/*.js', 'src/path.js');
    const p2 = new PolyPath('src/**/*.js', 'src/*.js');
    const p3 = new PolyPath('src/**/*.js');
    const p4 = new PolyPath('src/*.js');

    expect(p1).to.equal(p2);
    expect(p1).to.equal(p3);
    expect(p1).not.to.equal(p4);
  });
});

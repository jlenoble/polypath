import {expect} from 'chai';
import path from 'path';
import PolyPath from '../src/polypath';

describe('Testing PolyPath', function () {
  it(`Testing glob '*' pattern`, function () {
    const cwd = process.cwd();
    const src = new PolyPath('src/*.js', 'test/*.test.js');
    const build = src.rebase('build');

    expect(build.paths).to.eql([
      path.join(cwd, 'build', 'src/*.js'),
      path.join(cwd, 'build', 'test/*.test.js'),
    ]);
  });

  it(`Testing glob '**' pattern`, function () {
    const cwd = process.cwd();
    const src = new PolyPath('src/**/*.js', 'test/**/*.test.js');
    const build = src.rebase('build');

    expect(build.paths).to.eql([
      path.join(cwd, 'build', 'src/**/*.js'),
      path.join(cwd, 'build', 'test/**/*.test.js'),
    ]);
  });
});

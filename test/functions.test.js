import {expect} from 'chai';
import path from 'path';
import {rebase, resolve} from '../src/polypath';

describe('Testing package functions', function () {
  it(`Testing rebase`, function () {
    expect(rebase('src/*.js', 'build')).to.eql([path.join(process.cwd(),
      'build/src/*.js')]);
    expect(rebase(['src/*.js'], 'build')).to.eql([path.join(process.cwd(),
      'build/src/*.js')]);
    expect(rebase(['src/*.js', 'test/*.js'], 'build')).to.eql([
      path.join(process.cwd(), 'build/src/*.js'),
      path.join(process.cwd(), 'build/test/*.js'),
    ]);

    expect(rebase('src/*.js', 'src', 'build')).to.eql([path.join(process.cwd(),
      'build/*.js')]);
    expect(rebase(['src/*.js'], 'src', 'build')).to.eql(
      [path.join(process.cwd(), 'build/*.js')]);
    expect(rebase(['src/*.js', 'test/*.js'], 'src', 'build')).to.eql([
      path.join(process.cwd(), 'build/*.js'),
      path.join(process.cwd(), 'test/*.js'), // cwd/src/../test -> cwd/test
    ]);
  });

  it(`Testing resolve`, function () {
    const paths = ['.babelrc', 'src/path.js', 'src/polypath.js'].map(
      f => path.join(process.cwd(), f));

    return Promise.all([
      resolve('src/*.js'),
      resolve(['src/*.js']),
      resolve('.babelrc'),
      resolve(['src/*.js', '.babelrc']),
      resolve('src/*.js', '.babelrc'),
      resolve(['src/*.js'], ['.babelrc']),
      resolve(['src/*.js'], '.babelrc'),
      resolve('src/*.js', ['.babelrc']),
      resolve([['src/*.js'], '.babelrc']),
      resolve(['src/*.js', ['.babelrc']]),
      resolve([['src/*.js'], ['.babelrc']]),
    ]).then(files => {
      expect(files).to.eql([
        ['path.js', 'polypath.js'].map(f => path.join(process.cwd(), 'src', f)),
        ['path.js', 'polypath.js'].map(f => path.join(process.cwd(), 'src', f)),
        ['.babelrc'].map(f => path.join(process.cwd(), f)),
        paths, paths, paths, paths, paths, paths, paths, paths,
      ]);
    });
  });
});

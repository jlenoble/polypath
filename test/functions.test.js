import {expect} from 'chai';
import path from 'path';
import {rebaseGlob, resolveGlob} from '../src/polypath';

describe('Testing package functions', function () {
  it(`Testing rebaseGlob`, function () {
    expect(rebaseGlob('src/*.js', 'build')).to.eql([path.join(process.cwd(),
      'build/src/*.js')]);
    expect(rebaseGlob(['src/*.js'], 'build')).to.eql([path.join(process.cwd(),
      'build/src/*.js')]);
    expect(rebaseGlob(['src/*.js', 'test/*.js'], 'build')).to.eql([
      path.join(process.cwd(), 'build/src/*.js'),
      path.join(process.cwd(), 'build/test/*.js'),
    ]);

    expect(rebaseGlob('src/*.js', 'src', 'build')).to.eql([
      path.join(process.cwd(), 'build/*.js')]);
    expect(rebaseGlob(['src/*.js'], 'src', 'build')).to.eql(
      [path.join(process.cwd(), 'build/*.js')]);
    expect(rebaseGlob(['src/*.js', 'test/*.js'], 'src', 'build')).to.eql([
      path.join(process.cwd(), 'build/*.js'),
      path.join(process.cwd(), 'test/*.js'), // cwd/src/../test -> cwd/test
    ]);
  });

  it(`Testing resolveGlob`, function () {
    const paths = ['.babelrc', 'src/path.js', 'src/polypath.js'].map(
      f => path.join(process.cwd(), f));

    return Promise.all([
      resolveGlob('src/*.js'),
      resolveGlob(['src/*.js']),
      resolveGlob('.babelrc'),
      resolveGlob(['src/*.js', '.babelrc']),
      resolveGlob('src/*.js', '.babelrc'),
      resolveGlob(['src/*.js'], ['.babelrc']),
      resolveGlob(['src/*.js'], '.babelrc'),
      resolveGlob('src/*.js', ['.babelrc']),
    ]).then(files => {
      expect(files).to.eql([
        ['path.js', 'polypath.js'].map(f => path.join(process.cwd(), 'src', f)),
        ['path.js', 'polypath.js'].map(f => path.join(process.cwd(), 'src', f)),
        ['.babelrc'].map(f => path.join(process.cwd(), f)),
        paths, paths, paths, paths, paths,
      ]);
    });
  });
});

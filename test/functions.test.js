import {expect} from 'chai';
import path from 'path';
import {rebase, resolve} from '../src/polypath';

describe('Testing package functions', function () {
  it(`Testing rebase`, function () {
    expect(rebase('src/*.js', 'build')).to.eql([path.join(process.cwd(),
      'build/src/*.js')]);
    expect(rebase('src/*.js', 'src', 'build')).to.eql([path.join(process.cwd(),
      'build/*.js')]);
  });

  it(`Testing resolve`, function () {
    return Promise.all([
      resolve('src/*.js'),
      resolve('.babelrc'),
    ]).then(files => {
      expect(files).to.eql([
        ['path.js', 'polypath.js'].map(f => path.join(process.cwd(), 'src', f)),
        ['.babelrc'].map(f => path.join(process.cwd(), f)),
      ]);
    });
  });
});

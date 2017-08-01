import PolyPath from '../../src/polypath';
import path from 'path';
import {expect} from 'chai';

describe('Testing README examples', function () {
  it(`Usage example`, function () {
    const cwd = process.cwd();

    const p = new PolyPath('src', 'test.js');

    expect(p.paths).to.eql([path.join(cwd, 'src'),
      path.join(cwd, 'test.js')]);
    expect(p.basenames()).to.eql(['src', 'test.js']);
    expect(p.dirnames()).to.eql([cwd, cwd]);
    expect(p.extnames()).to.eql(['', '.js']);

    expect(p.relative(cwd)).to.eql(['src', 'test.js']);
    expect(p.relative('test')).to.eql(['../src', '../test.js']);

    expect(p.rebase('build').paths).to.eql([
      path.join(cwd, 'build', 'src'),
      path.join(cwd, 'build', 'test.js')]);
  });
});

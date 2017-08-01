import PolyPath from '../../src/polypath';
import os from 'os';
import path from 'path';
import {expect} from 'chai';

describe('Testing README examples', function () {
  it(`Usage example`, function () {
    const home = os.homedir();
    const user = path.basename(home);
    const cwd = process.cwd();
    const project = path.relative(home, cwd);

    const p = new PolyPath('~', 'src', 'test.js');

    expect(p.paths).to.eql([home, path.join(cwd, 'src'),
      path.join(cwd, 'test.js')]);
    expect(p.basenames()).to.eql([user, 'src', 'test.js']);
    expect(p.dirnames()).to.eql([path.dirname(home), cwd, cwd]);
    expect(p.extnames()).to.eql(['', '', '.js']);

    expect(p.relative('/home')).to.eql([user, path.join(user, project, 'src'),
      path.join(user, project, 'test.js')]);
    expect(p.relative(cwd)).to.eql(['../..', 'src', 'test.js']);

    expect(p.rebase('/home').paths).to.eql([
      '/', path.join('/home', 'src'), path.join('/home', 'test.js')]);
    expect(p.rebase('build').paths).to.eql([
      path.join(home, project, '..'), path.join(cwd, 'build', 'src'),
      path.join(cwd, 'build', 'test.js')]);
  });
});

import {expect} from 'chai';
import os from 'os';
import path from 'path';
import Path from '../src/path';
// import PolyPath from '../src/polypath';

describe('Testing Path', function () {
  it(`Testing rebase method`, function () {
    const cwd = process.cwd();
    const home = os.homedir();

    const p1 = new Path(path.join(cwd, 'src'));
    const p2 = new Path(path.join(cwd, 'test'));
    const p3 = new Path(path.join(cwd, 'src/polypath.js'));

    expect(p1.rebase().path).to.equal(p1.path);
    expect(p2.rebase().path).to.equal(p2.path);
    expect(p3.rebase().path).to.equal(p3.path);

    expect(p1.rebase('build').path).to.equal(path.join(cwd, 'build/src'));
    expect(p2.rebase('build').path).to.equal(path.join(cwd, 'build/test'));
    expect(p3.rebase('build').path).to.equal(path.join(cwd,
      'build/src/polypath.js'));

    expect(p1.rebase(home).path).to.equal(path.join(home, 'src'));
    expect(p2.rebase(home).path).to.equal(path.join(home, 'test'));
    expect(p3.rebase(home).path).to.equal(path.join(home, 'src/polypath.js'));
  });
});


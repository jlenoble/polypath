import {expect} from 'chai';
import os from 'os';
import path from 'path';
import Path from '../src/path';
import PolyPath from '../src/polypath';

describe('Testing Path', function () {
  it(`Testing rebase method (one arg)`, function () {
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

  it(`Testing rebase method (two args)`, function () {
    const cwd = process.cwd();

    const p1 = new Path('src/path.js');
    const p2 = new Path('src/polypath.js');

    expect(p1.rebase('build').path)
      .to.equal(path.join(cwd, 'build/src/path.js'));
    expect(p2.rebase('build').path)
      .to.equal(path.join(cwd, 'build/src/polypath.js'));

    expect(p1.rebase('src', 'build').path)
      .to.equal(path.join(cwd, 'build/path.js'));
    expect(p2.rebase('src', 'build').path)
      .to.equal(path.join(cwd, 'build/polypath.js'));
  });
});

describe('Testing PolyPath', function () {
  it(`Testing rebase method (one arg)`, function () {
    const cwd = process.cwd();
    const home = os.homedir();

    const p = new PolyPath(
      path.join(cwd, 'src'),
      path.join(cwd, 'test'),
      path.join(cwd, 'src/polypath.js')
    );

    expect(p.rebase().paths).to.eql(p.paths);

    expect(p.rebase('build').paths).to.eql([
      path.join(cwd, 'build/src'),
      path.join(cwd, 'build/src/polypath.js'),
      path.join(cwd, 'build/test'),
    ]);

    expect(p.rebase(home).paths).to.eql([
      path.join(home, 'src'),
      path.join(home, 'src/polypath.js'),
      path.join(home, 'test'),
    ]);
  });

  it(`Testing rebase method (two args)`, function () {
    const cwd = process.cwd();

    const p = new PolyPath(
      path.join(cwd, 'src/path.js'),
      path.join(cwd, 'src/polypath.js')
    );

    expect(p.rebase('build').paths).to.eql([
      path.join(cwd, 'build/src/path.js'),
      path.join(cwd, 'build/src/polypath.js'),
    ]);

    expect(p.rebase('src', 'build').paths).to.eql([
      path.join(cwd, 'build/path.js'),
      path.join(cwd, 'build/polypath.js'),
    ]);
  });
});

import {expect} from 'chai';
import os from 'os';
import path from 'path';
import PolyPath from '../src/polypath';

describe('Testing PolyPath', function () {
  it(`Testing strict equality`, function () {
    const p1 = new PolyPath('~', '~/projects/keyfunc', '../src/muter.js');
    const p2 = new PolyPath(
      '~/projects/keyfunc',
      os.homedir(),
      path.join(process.cwd(), '../src/muter.js')
    );

    expect(p1).to.equal(p2);
  });

  it(`paths, basenames, dirnames and extnames properties`, function () {
    const p = new PolyPath('~', '~/projects/keyfunc', '../src/muter.js');

    expect(p.paths).to.eql([
      os.homedir(),
      path.join(os.homedir(), 'projects/keyfunc'),
      path.join(process.cwd(), '../src/muter.js'),
    ]);

    expect(p.dirnames()).to.eql([
      path.dirname(os.homedir()),
      path.join(os.homedir(), 'projects'),
      path.join(process.cwd(), '../src'),
    ]);

    expect(p.basenames()).to.eql([
      path.basename(os.homedir()),
      'keyfunc',
      'muter.js',
    ]);

    expect(p.extnames()).to.eql(['', '', '.js']);
  });
});

import {expect} from 'chai';
import Path from '../src/path';
import os from 'os';
import path from 'path';

describe('Testing Path', function () {
  it(`path, basename, dirname and extname properties`, function () {
    const p1 = new Path('~');
    const p2 = new Path('~/projects/keyfunc');
    const p3 = new Path('../src/muter.js');

    expect(p1.path).to.equal(os.homedir());
    expect(p2.path).to.equal(path.join(os.homedir(), 'projects/keyfunc'));
    expect(p3.path).to.equal(path.join(process.cwd(), '../src/muter.js'));

    expect(p1.dirname()).to.equal(path.dirname(os.homedir()));
    expect(p2.dirname()).to.equal(path.join(os.homedir(), 'projects'));
    expect(p3.dirname()).to.equal(path.join(process.cwd(), '../src'));

    expect(p1.basename()).to.equal(path.basename(os.homedir()));
    expect(p2.basename()).to.equal('keyfunc');
    expect(p3.basename()).to.equal('muter.js');

    expect(p1.extname()).to.equal('');
    expect(p2.extname()).to.equal('');
    expect(p3.extname()).to.equal('.js');
  });
});

import {expect} from 'chai';
import os from 'os';
import path from 'path';
import PolyPath from '../src/polypath';

describe('Testing PolyPath', function () {
  it(`Testing unicity`, function () {
    const p1 = new PolyPath('~/projects/keyfunc');
    const p2 = new PolyPath(
      '~/projects/keyfunc',
      '~/projects/keyfunc',
      path.join(os.homedir(), 'projects/keyfunc')
    );

    expect(p1).to.equal(p2);
  });
});

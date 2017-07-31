import {expect} from 'chai';
import PolyPath, {Path} from '../src/polypath';

describe('Testing PolyPath', function () {
  it(`Testing single Path arg`, function () {
    const p = new Path('~/projects/keyfunc');
    const p1 = new PolyPath('~/projects/keyfunc');
    const p2 = new PolyPath(p);

    expect(p1).to.equal(p2);
  });
});

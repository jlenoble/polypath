import {expect} from 'chai';
import PolyPath, {Path} from '../src/polypath';

describe('Testing PolyPath', function () {
  it(`Testing single Path arg`, function () {
    const p = new Path('~/projects/keyfunc');
    const p1 = new PolyPath('~/projects/keyfunc');
    const p2 = new PolyPath(p);

    expect(p1).to.equal(p2);
  });

  it(`Testing redundant Path arg`, function () {
    const p = new Path('~/projects/keyfunc');
    const p1 = new PolyPath('~/projects/keyfunc');
    const p2 = new PolyPath(p, p, p);

    expect(p1).to.equal(p2);
  });

  it(`Testing mixed args (same paths)`, function () {
    const p = new Path('~/projects/keyfunc');
    const p1 = new PolyPath('~/projects/keyfunc');
    const p2 = new PolyPath(p, '~/projects/keyfunc', p);

    expect(p1).to.equal(p2);
  });

  it(`Testing mixed args (different paths)`, function () {
    const p1 = new Path('~/projects/keyfunc');
    const p2 = new Path('~/projects/singletons');

    const P1 = new PolyPath('~/projects/keyfunc', p2);
    const P2 = new PolyPath('~/projects/singletons', p1);

    expect(P1).to.equal(P2);
  });

  it(`Testing single PolyPath arg`, function () {
    const p1 = new PolyPath('~/projects/keyfunc');
    const p2 = new PolyPath(p1);

    expect(p1).to.equal(p2);
  });

  it(`Testing redundant PolyPath arg`, function () {
    const p = new PolyPath('~/projects/keyfunc');
    const p1 = new PolyPath(p);
    const p2 = new PolyPath(p, p, p);

    expect(p1).to.equal(p2);
  });

  it(`Testing mixed args (same paths)`, function () {
    const p = new Path('~/projects/keyfunc');
    const p1 = new PolyPath(p);
    const p2 = new PolyPath(p, '~/projects/keyfunc', p1);

    expect(p1).to.equal(p2);
  });

  it(`Testing mixed args (different paths)`, function () {
    const p1 = new Path('~/projects/keyfunc');
    const p2 = new PolyPath('~/projects/singletons');

    const P1 = new PolyPath('~/projects/keyfunc', p2);
    const P2 = new PolyPath('~/projects/singletons', p1, p2);

    expect(P1).to.equal(P2);
  });

  it(`Testing mixed args (nesting)`, function () {
    const p1 = new Path('a');
    const p2 = new PolyPath('a', 'c');
    const p3 = new PolyPath('d', 'f', 'b');

    const P1 = new PolyPath(p1, p2, 'e', p3);
    const P2 = new PolyPath(P1, 'e');

    expect(new PolyPath(P1, P2)).to.equal(new PolyPath(
      'a', 'b', 'c', 'd', 'e', 'f'));
  });
});

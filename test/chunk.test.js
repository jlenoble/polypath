import {expect} from 'chai';
import Chunk from '../src/chunk';
import Muter, {muted} from 'muter';
// import Muter, {captured as muted} from 'muter';

describe('A Chunk instance', function () {
  const muter = Muter(console);

  it('encapsulates a string', function () {
    expect(new Chunk('a').chunk).to.equal('a');
  });

  it('throws on anything but a string', muted(muter, function () {
    expect(() => new Chunk(42).chunk).to.throw('Not a string');
    expect(() => new Chunk({}).chunk).to.throw('Not a string');
    expect(() => new Chunk([]).chunk).to.throw('Not a string');
  }));
});

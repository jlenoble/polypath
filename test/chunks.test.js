import {expect} from 'chai';
import Chunks, {StarChunks} from '../src/chunks';
import Muter, {muted} from 'muter';
// import Muter, {captured as muted} from 'muter';

const muter = Muter(console);

describe('A Chunks instance', function () {
  it('encapsulates a string', function () {
    expect(new Chunks('a').chunk).to.equal('a');
    expect(new Chunks('abc').chunk).to.equal('abc');
  });

  it('throws on anything but a string', muted(muter, function () {
    expect(() => new Chunks(42).chunk).to.throw('Not plain chunks');
    expect(() => new Chunks({}).chunk).to.throw('Not plain chunks');
    expect(() => new Chunks([]).chunk).to.throw('Not plain chunks');
  }));

  it('throws on non plain string', muted(muter, function () {
    expect(() => new Chunks('*').chunk).to.throw('Not plain chunks');
    expect(() => new Chunks('a?').chunk).to.throw('Not plain chunks');
    expect(() => new Chunks('!abc').chunk).to.throw('Not plain chunks');
    expect(() => new Chunks('a/b/c').chunk).to.throw('Not plain chunks');
    expect(() => new Chunks('*,a,b').chunk).to.throw('Not plain chunks');
    expect(() => new Chunks('a?,a,b').chunk).to.throw('Not plain chunks');
    expect(() => new Chunks('!abc,a,b').chunk).to.throw('Not plain chunks');
    expect(() => new Chunks('a/b/c,a,b').chunk).to.throw('Not plain chunks');
  }));
});

describe('A StarChunks instance', function () {
  it('encapsulates a string', function () {
    expect(new StarChunks('a*').chunk).to.equal('a*');
    expect(new StarChunks('*a*b*cde*').chunk).to.equal('*a*b*cde*');
    expect(new StarChunks('*a,*b*c,de*').chunk).to.equal('*a,*b*c,de*');
  });

  it('throws on anything but a string', muted(muter, function () {
    expect(() => new StarChunks(42).chunk).to.throw('Not star chunks');
    expect(() => new StarChunks({}).chunk).to.throw('Not star chunks');
    expect(() => new StarChunks([]).chunk).to.throw('Not star chunks');
  }));

  it('throws on non star string', muted(muter, function () {
    expect(() => new StarChunks('a').chunk).to.throw('Not star chunks');
    expect(() => new StarChunks('*?').chunk).to.throw('Not star chunks');
    expect(() => new StarChunks('!*bc').chunk).to.throw('Not star chunks');
    expect(() => new StarChunks('*/b/c').chunk).to.throw('Not star chunks');
    expect(() => new StarChunks('a,b,c').chunk).to.throw('Not star chunks');
    expect(() => new StarChunks('a*,*b,?').chunk).to.throw('Not star chunks');
    expect(() => new StarChunks('!a,b*,c*').chunk).to.throw('Not star chunks');
    expect(() => new StarChunks('*/c,a/d,*').chunk).to.throw('Not star chunks');
  }));
});

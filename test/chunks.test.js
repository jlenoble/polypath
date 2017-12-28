import {expect} from 'chai';
import Chunks, {StarChunks, MixedChunks} from '../src/chunks';
import Muter, {muted} from 'muter';
// import Muter, {captured as muted} from 'muter';

const muter = Muter(console);

describe('A Chunks instance', function () {
  it('encapsulates chunks', function () {
    expect(new Chunks('a').chunk).to.equal('a');
    expect(new Chunks('a,b,c').chunk).to.equal('a,b,c');
    expect(new Chunks('b,a,c').chunk).to.equal('a,b,c');
  });

  it('throws on anything but a string', muted(muter, function () {
    expect(() => new Chunks(42).chunk).to.throw('Not word chunks');
    expect(() => new Chunks({}).chunk).to.throw('Not word chunks');
    expect(() => new Chunks([]).chunk).to.throw('Not word chunks');
  }));

  it('throws on non chunks', muted(muter, function () {
    expect(() => new Chunks('*').chunk).to.throw('Not word chunks');
    expect(() => new Chunks('a?').chunk).to.throw('Not word chunks');
    expect(() => new Chunks('!abc').chunk).to.throw('Not word chunks');
    expect(() => new Chunks('a/b/c').chunk).to.throw('Not word chunks');
    expect(() => new Chunks('*,a,b').chunk).to.throw('Not word chunks');
    expect(() => new Chunks('a?,a,b').chunk).to.throw('Not word chunks');
    expect(() => new Chunks('!abc,a,b').chunk).to.throw('Not word chunks');
    expect(() => new Chunks('a/b/c,a,b').chunk).to.throw('Not word chunks');
  }));
});

describe('A StarChunks instance', function () {
  it('encapsulates star chunks', function () {
    expect(new StarChunks('a*').chunk).to.equal('a*');
    expect(new StarChunks('*a*b*cde*').chunk).to.equal('*a*b*cde*');
    expect(new StarChunks('*a,*b*c,de*').chunk).to.equal('*a,*b*c,de*');
  });

  it('throws on anything but a string', muted(muter, function () {
    expect(() => new StarChunks(42).chunk).to.throw('Not star chunks');
    expect(() => new StarChunks({}).chunk).to.throw('Not star chunks');
    expect(() => new StarChunks([]).chunk).to.throw('Not star chunks');
  }));

  it('throws on non star chunks', muted(muter, function () {
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

describe('A MixedChunks instance', function () {
  it('encapsulates mixed chunks', function () {
    expect(new MixedChunks('a*,b').chunk).to.equal('a*,b');
    expect(new MixedChunks('*a*b*cde*,x,y').chunk).to.equal('*a*b*cde*,x,y');
    expect(new MixedChunks('*a,*b*c,de*,xyz').chunk)
      .to.equal('*a,*b*c,de*,xyz');
  });

  it('throws on anything but a string', muted(muter, function () {
    expect(() => new MixedChunks(42).chunk).to.throw('Not mixed chunks');
    expect(() => new MixedChunks({}).chunk).to.throw('Not mixed chunks');
    expect(() => new MixedChunks([]).chunk).to.throw('Not mixed chunks');
  }));

  it('throws on non mixed chunks', muted(muter, function () {
    expect(() => new MixedChunks('a').chunk).to.throw('Not mixed chunks');
    expect(() => new MixedChunks('*?').chunk).to.throw('Not mixed chunks');
    expect(() => new MixedChunks('!*bc').chunk).to.throw('Not mixed chunks');
    expect(() => new MixedChunks('*/b/c').chunk).to.throw('Not mixed chunks');
    expect(() => new MixedChunks('a,b,c').chunk).to.throw('Not mixed chunks');
    expect(() => new MixedChunks('a*,*b,?').chunk).to.throw('Not mixed chunks');
    expect(() => new MixedChunks('!a,b*,c*').chunk)
      .to.throw('Not mixed chunks');
    expect(() => new MixedChunks('*/c,a/d,*').chunk)
      .to.throw('Not mixed chunks');
  }));
});

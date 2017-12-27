import {expect} from 'chai';
import {Chunk, StarChunk, Chunks, StarChunks, MixedChunks}
  from '../../src/index';

describe('Adding Chunk', function () {
  it('with same Chunk yields same Chunk', function () {
    expect(new Chunk('a').add(new Chunk('a')).chunk).to.equal('a');
    expect(new Chunk('abc').add(new Chunk('abc')).chunk).to.equal('abc');
  });

  it('with a different Chunk yields a Chunks', function () {
    const c1 = new Chunk('a').add(new Chunk('b'));
    const c2 = new Chunk('abc').add(new Chunk('xyz'));

    expect(c1).to.be.instanceof(Chunks);
    expect(c2).to.be.instanceof(Chunks);

    expect(c1.chunk).to.equal('a,b');
    expect(c2.chunk).to.equal('abc,xyz');
  });

  it('with matched StarChunk yields same StarChunk', function () {
    expect(new Chunk('a').add(new StarChunk('a*')).chunk).to.equal('a*');
    expect(new Chunk('abc').add(new StarChunk('*ab*c')).chunk)
      .to.equal('*ab*c');
  });

  it('with unmatched StarChunk yields a MixedChunk', function () {
    const c1 = new Chunk('a').add(new StarChunk('b*'));
    const c2 = new Chunk('abc').add(new StarChunk('x*'));

    expect(c1).to.be.instanceof(MixedChunks);
    expect(c2).to.be.instanceof(MixedChunks);

    expect(c1.chunk).to.equal('a,b*');
    expect(c2.chunk).to.equal('abc,x*');
  });

  it('with a Chunks yields a Chunks', function () {
    const c1 = new Chunk('a').add(new Chunks('b'));
    const c2 = new Chunk('abc').add(new Chunks('x,y,z'));

    expect(c1).to.be.instanceof(Chunks);
    expect(c2).to.be.instanceof(Chunks);

    expect(c1.chunk).to.equal('a,b');
    expect(c2.chunk).to.equal('abc,x,y,z');
  });

  it('with an overlapping Chunks yields same Chunks', function () {
    const c1 = new Chunk('a').add(new Chunks('b,a'));
    const c2 = new Chunk('abc').add(new Chunks('x,y,abc,z'));

    expect(c1).to.be.instanceof(Chunks);
    expect(c2).to.be.instanceof(Chunks);

    expect(c1.chunk).to.equal('a,b');
    expect(c2.chunk).to.equal('abc,x,y,z');
  });

  it('with a StarChunks yields a MixedChunks', function () {
    const c1 = new Chunk('a').add(new StarChunks('b*'));
    const c2 = new Chunk('abc').add(new StarChunks('x*,*y,*z*'));

    expect(c1).to.be.instanceof(MixedChunks);
    expect(c2).to.be.instanceof(MixedChunks);

    expect(c1.chunk).to.equal('a,b*');
    expect(c2.chunk).to.equal('*y,*z*,abc,x*');
  });

  it('with an overlapping StarChunks yields same StarChunks', function () {
    const c1 = new Chunk('a').add(new StarChunks('*b,*a*'));
    const c2 = new Chunk('abc').add(new StarChunks('*x,a*c,z*'));

    expect(c1).to.be.instanceof(StarChunks);
    expect(c2).to.be.instanceof(StarChunks);

    expect(c1.chunk).to.equal('*a*,*b');
    expect(c2.chunk).to.equal('*x,a*c,z*');
  });

  it('with a MixedChunks yields a MixedChunks', function () {
    const c1 = new Chunk('a').add(new MixedChunks('b*,c'));
    const c2 = new Chunk('abc').add(new MixedChunks('x*,*y,*z*,u,v'));

    expect(c1).to.be.instanceof(MixedChunks);
    expect(c2).to.be.instanceof(MixedChunks);

    expect(c1.chunk).to.equal('a,b*,c');
    expect(c2.chunk).to.equal('*y,*z*,abc,u,v,x*');
  });

  it('with an overlapping MixedChunks yields same MixedChunks', function () {
    const c1 = new Chunk('a').add(new MixedChunks('*b,*a*,c'));
    const c2 = new Chunk('abc').add(new MixedChunks('*x,a*c,z*,u,v'));

    expect(c1).to.be.instanceof(MixedChunks);
    expect(c2).to.be.instanceof(MixedChunks);

    expect(c1.chunk).to.equal('*a*,*b,c');
    expect(c2.chunk).to.equal('*x,a*c,u,v,z*');
  });
});

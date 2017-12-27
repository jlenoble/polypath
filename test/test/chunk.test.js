import {expect} from 'chai';
import {Chunk, StarChunk, Chunks, StarChunks, MixedChunks}
  from '../../src/index';

describe('Chunk', function () {
  it('testing same Chunk yields true', function () {
    expect(new Chunk('a').test(new Chunk('a'))).to.be.true;
    expect(new Chunk('abc').test(new Chunk('abc'))).to.be.true;
  });

  it('testing a different Chunk yields false', function () {
    expect(new Chunk('a').test(new Chunk('b'))).to.be.false;
    expect(new Chunk('abc').test(new Chunk('xyz'))).to.be.false;
  });

  it('testing matched StarChunk yields true', function () {
    expect(new Chunk('a').test(new StarChunk('a*'))).to.be.true;
    expect(new Chunk('abc').test(new StarChunk('*ab*c'))).to.be.true;
  });

  it('testing unmatched StarChunk yields false', function () {
    expect(new Chunk('a').test(new StarChunk('b*'))).to.be.false;
    expect(new Chunk('abc').test(new StarChunk('x*'))).to.be.false;
  });

  it('testing a Chunks yields false', function () {
    expect(new Chunk('a').test(new Chunks('b'))).to.be.false;
    expect(new Chunk('abc').test(new Chunks('x,y,z'))).to.be.false;
  });

  it('testing an overlapping Chunks yields true', function () {
    expect(new Chunk('a').test(new Chunks('b,a'))).to.be.true;
    expect(new Chunk('abc').test(new Chunks('x,y,abc,z'))).to.be.true;
  });

  it('testing a StarChunks yields false', function () {
    expect(new Chunk('a').test(new StarChunks('b*'))).to.be.false;
    expect(new Chunk('abc').test(new StarChunks('x*,*y,*z*'))).to.be.false;
  });

  it('testing an overlapping StarChunks yields true', function () {
    expect(new Chunk('a').test(new StarChunks('*b,*a*'))).to.be.true;
    expect(new Chunk('abc').test(new StarChunks('*x,a*c,z*'))).to.be.true;
  });

  it('testing a MixedChunks yields false', function () {
    expect(new Chunk('a').test(new MixedChunks('b*,c'))).to.be.false;
    expect(new Chunk('abc').test(new MixedChunks('x*,*y,*z*,u,v'))).to.be.false;
  });

  it('testing an overlapping MixedChunks yields true', function () {
    expect(new Chunk('a').test(new MixedChunks('*b,*a*,c'))).to.be.true;
    expect(new Chunk('abc').test(new MixedChunks('*x,a*c,z*,u,v'))).to.be.true;
  });
});

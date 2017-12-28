import {expect} from 'chai';
import {Chunk, StarChunk, Chunks}
  from '../../src/index';

describe('Chunks', function () {
  it('testing same Chunks yields true', function () {
    expect(new Chunks('a').test(new Chunks('a'))).to.be.true;
    expect(new Chunks('a,b,c').test(new Chunks('a,b,c'))).to.be.true;
  });

  it('testing a distinct Chunks yields false', function () {
    expect(new Chunks('a').test(new Chunks('b'))).to.be.false;
    expect(new Chunks('a,b,c').test(new Chunks('x,y,z'))).to.be.false;
  });

  it('testing an overlapping Chunks can yield false', function () {
    expect(new Chunks('a').test(new Chunks('a,b'))).to.be.false;
    expect(new Chunks('a,b,c').test(new Chunks('b,c,d,e'))).to.be.false;
  });

  it('testing an encompassed Chunks yields true', function () {
    expect(new Chunks('a,b').test(new Chunks('b,a'))).to.be.true;
    expect(new Chunks('a,b,c,d').test(new Chunks('b,c'))).to.be.true;
  });

  it('testing a distinct Chunk yields false', function () {
    expect(new Chunks('a').test(new Chunk('d'))).to.be.false;
    expect(new Chunks('a,b,c').test(new Chunk('d'))).to.be.false;
  });

  it('testing an encompassed Chunk yields true', function () {
    expect(new Chunks('a').test(new Chunk('a'))).to.be.true;
    expect(new Chunks('a,b,c').test(new Chunk('b'))).to.be.true;
  });

  it('testing an unmatched StarChunk yields false', function () {
    expect(new Chunks('a').test(new StarChunk('d*'))).to.be.false;
    expect(new Chunks('a,b,c').test(new StarChunk('d*'))).to.be.false;
  });

  it('testing a matched StarChunk yields true', function () {
    expect(new Chunks('a').test(new StarChunk('a*'))).to.be.true;
    expect(new Chunks('a,b,c').test(new StarChunk('b*'))).to.be.true;
  });
});

import {expect} from 'chai';
import {Chunk, StarChunk, Chunks} from '../../src/index';

// import Muter, {muted} from 'muter';
// import Muter, {captured as muted} from 'muter';

// const muter = Muter(console);

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

  it('with a Chunks yields a Chunks', function () {
    const c1 = new Chunk('a').add(new Chunks('b'));
    const c2 = new Chunk('abc').add(new Chunks('x,y,z'));

    expect(c1).to.be.instanceof(Chunks);
    expect(c2).to.be.instanceof(Chunks);

    expect(c1.chunk).to.equal('a,b');
    expect(c2.chunk).to.equal('abc,x,y,z');
  });

  it('with an overlapping Chunks yields same Chunks', function () {
    const c1 = new Chunk('a').add(new Chunks('a,b'));
    const c2 = new Chunk('abc').add(new Chunks('x,y,abc,z'));

    expect(c1).to.be.instanceof(Chunks);
    expect(c2).to.be.instanceof(Chunks);

    expect(c1.chunk).to.equal('a,b');
    expect(c2.chunk).to.equal('abc,x,y,z');
  });
});

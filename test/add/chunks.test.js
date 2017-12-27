import {expect} from 'chai';
import {Chunk, Chunks} from '../../src/index';

describe('Adding Chunks', function () {
  it('with same Chunks yields same Chunks', function () {
    expect(new Chunks('a').add(new Chunks('a')).chunk).to.equal('a');
    expect(new Chunks('a,b,c').add(new Chunks('a,b,c')).chunk)
      .to.equal('a,b,c');
  });

  it('with a distinct Chunks yields a Chunks', function () {
    const c1 = new Chunks('a').add(new Chunks('b'));
    const c2 = new Chunks('a,b,c').add(new Chunks('x,y,z'));

    expect(c1).to.be.instanceof(Chunks);
    expect(c2).to.be.instanceof(Chunks);

    expect(c1.chunk).to.equal('a,b');
    expect(c2.chunk).to.equal('a,b,c,x,y,z');
  });

  it('with an overlapping Chunks yields a Chunks', function () {
    const c1 = new Chunks('a').add(new Chunks('a,b'));
    const c2 = new Chunks('a,b,c').add(new Chunks('b,c,d,e'));

    expect(c1).to.be.instanceof(Chunks);
    expect(c2).to.be.instanceof(Chunks);

    expect(c1.chunk).to.equal('a,b');
    expect(c2.chunk).to.equal('a,b,c,d,e');
  });

  it('with a Chunk yields a Chunks', function () {
    const c1 = new Chunks('a,b,c').add(new Chunk('d'));
    const c2 = new Chunks('a,b,c').add(new Chunk('b'));

    expect(c1).to.be.instanceof(Chunks);
    expect(c2).to.be.instanceof(Chunks);

    expect(c1.chunk).to.equal('a,b,c,d');
    expect(c2.chunk).to.equal('a,b,c');
  });
});

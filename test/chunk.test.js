import {expect} from 'chai';
import Chunk, {StarChunk, Empty, Star} from '../src/chunk';
import Muter, {muted} from 'muter';
// import Muter, {captured as muted} from 'muter';

const muter = Muter(console);

describe('A Chunk instance', function () {
  it('encapsulates a word string', function () {
    expect(new Chunk('a').chunk).to.equal('a');
    expect(new Chunk('abc').chunk).to.equal('abc');
    expect(new Chunk('').chunk).to.equal('');

    expect(new Chunk('')).to.be.instanceof(Empty);
  });

  it('throws on anything but a string', muted(muter, function () {
    expect(() => new Chunk(42).chunk).to.throw('Not a word chunk');
    expect(() => new Chunk({}).chunk).to.throw('Not a word chunk');
    expect(() => new Chunk([]).chunk).to.throw('Not a word chunk');
  }));

  it('throws on non word string', muted(muter, function () {
    expect(() => new Chunk('*').chunk).to.throw('Not a word chunk');
    expect(() => new Chunk('a?').chunk).to.throw('Not a word chunk');
    expect(() => new Chunk('!abc').chunk).to.throw('Not a word chunk');
    expect(() => new Chunk('a/b/c').chunk).to.throw('Not a word chunk');
  }));
});

describe('A StarChunk instance', function () {
  it('encapsulates a chunk?(*chunk?)+', function () {
    expect(new StarChunk('a*').chunk).to.equal('a*');
    expect(new StarChunk('a****').chunk).to.equal('a*');
    expect(new StarChunk('*a*b*cde*').chunk).to.equal('*a*b*cde*');
    expect(new StarChunk('**a****b**cde***').chunk).to.equal('*a*b*cde*');

    expect(new StarChunk('*').chunk).to.equal('*');
    expect(new StarChunk('***').chunk).to.equal('*');

    expect(new StarChunk('*')).to.be.instanceof(Star);
    expect(new StarChunk('***')).to.be.instanceof(Star);
  });

  it('throws on anything but a string', muted(muter, function () {
    expect(() => new StarChunk(42).chunk).to.throw('Not a star chunk');
    expect(() => new StarChunk({}).chunk).to.throw('Not a star chunk');
    expect(() => new StarChunk([]).chunk).to.throw('Not a star chunk');
  }));

  it('throws on non star chunk', muted(muter, function () {
    expect(() => new StarChunk('a').chunk).to.throw('Not a star chunk');
    expect(() => new StarChunk('*?').chunk).to.throw('Not a star chunk');
    expect(() => new StarChunk('!*bc').chunk).to.throw('Not a star chunk');
    expect(() => new StarChunk('*/b/c').chunk).to.throw('Not a star chunk');
  }));
});

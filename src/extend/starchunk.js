/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes,
  overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _true, _false, _equals, _isDistinct,
  _includes, _includesAll, _includesNot, _overlapsStrictly,
  _addMixed, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunk/Chunk API
// ***************************************************************************
add(StarChunk, Chunk, _addMixed);
remove(StarChunk, Chunk, _toBeImplemented);
equals(StarChunk, Chunk, _false);
isDistinct(StarChunk, Chunk, _includesNot);
includes(StarChunk, Chunk, _includes);
overlaps(StarChunk, Chunk, _includes);
overlapsStrictly(StarChunk, Chunk, _false);


// ***************************************************************************
// StarChunk/StarChunk API
// ***************************************************************************
add(StarChunk, StarChunk, function (obj) {
  return this.includes(obj) ? this : obj.includes(this) ? obj :
    new StarChunks(this.chunk + ',' + obj.chunk);
});
remove(StarChunk, StarChunk, _toBeImplemented);
equals(StarChunk, StarChunk, _equals);
isDistinct(StarChunk, StarChunk, _isDistinct);
includes(StarChunk, StarChunk, function (obj) {
  const chunks1 = this.chunk.split('*');
  const chunks2 = obj.chunk.split('*');

  const iA1 = chunks1[Symbol.iterator]();
  const iA2 = chunks2[Symbol.iterator]();

  let a1 = iA1.next();
  let a2 = iA2.next();
  let b1;
  let b2;

  if (a1.value === '') {
    a1 = iA1.next();

    if (a2.value === '') {
      a2 = iA2.next();
    }
  } else {
    if (!a2.value.includes(a1.value)) {
      return false;
    }

    if (a2.value.substring(0, a1.value.length) !== a1.value) {
      return false;
    }
  }

  while (!a1.done && !a2.done) {
    if (!a2.value.includes(a1.value)) {
      return false;
    }

    b1 = a1;
    a1 = iA1.next();

    do {
      b2 = a2;
      a2 = iA2.next();
    } while (!a2.done && !a2.value.includes(a1.value));
  }

  if (!a1.done) {
    if (b2.value === '') {
      return a1.value === '';
    }

    if (a1.value !== '') {
      return b2.value.includes(a1.value);
    }
  }

  if (b2.value === '') {
    return b1.value === '';
  }

  if (!b2.value.includes(b1.value)) {
    return false;
  }

  return b2.value.substring(b2.value.length - b1.value.length) === b1.value;
});
overlaps(StarChunk, StarChunk, function (obj) {
  const chunks1 = this.chunk.split('*');
  const chunks2 = obj.chunk.split('*');

  const a1 = chunks1[0];
  const b1 = chunks1[chunks1.length - 1];
  const a2 = chunks2[0];
  const b2 = chunks2[chunks2.length - 1];

  if (!a1.includes(a2)) {
    if (!a2.includes(a1) || a2.substring(0, a1.length) !== a1) {
      return false;
    }
  } else {
    if (a1.substring(0, a2.length) !== a2) {
      return false;
    }
  }

  if (!b1.includes(b2)) {
    if (!b2.includes(b1)) {
      return false;
    }

    return b2.substring(b2.length - b1.length) === b1;
  }

  return b1.substring(b1.length - b2.length) === b2;
});
overlapsStrictly(StarChunk, StarChunk, _overlapsStrictly);


// ***************************************************************************
// StarChunk/Star API
// ***************************************************************************
remove(StarChunk, Star, _empty);


// ***************************************************************************
// StarChunk/Empty API
// ***************************************************************************
remove(StarChunk, Empty, _this);
includes(StarChunk, Empty, _true);


// ***************************************************************************
// StarChunk/Chunks API
// ***************************************************************************
remove(StarChunk, Chunks, _toBeImplemented);
includes(StarChunk, Chunks, _includesAll);


// ***************************************************************************
// StarChunk/StarChunks API
// ***************************************************************************
remove(StarChunk, StarChunks, _toBeImplemented);
includes(StarChunk, StarChunks, _includesAll);


// ***************************************************************************
// StarChunk/MixedChunks API
// ***************************************************************************
remove(StarChunk, MixedChunks, _toBeImplemented);
includes(StarChunk, MixedChunks, _includesAll);

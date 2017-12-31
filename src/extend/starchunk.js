/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _true, _false, _equals, _isDistinct,
  _includes, _includesAll, _includesNot, _includesStrictly,
  _isIncluded, _isIncludedStrictly, _overlapsStrictly, _addTo,
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
includesStrictly(StarChunk, Chunk, _includes);
isIncluded(StarChunk, Chunk, _false);
isIncludedStrictly(StarChunk, Chunk, _false);
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
includesStrictly(StarChunk, StarChunk, _includesStrictly);
isIncluded(StarChunk, StarChunk, _isIncluded);
isIncludedStrictly(StarChunk, StarChunk, _isIncludedStrictly);
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
includes(StarChunk, Star, _false);
includesStrictly(StarChunk, Star, _false);
isIncluded(StarChunk, Star, _true);
isIncludedStrictly(StarChunk, Star, _true);


// ***************************************************************************
// StarChunk/Empty API
// ***************************************************************************
remove(StarChunk, Empty, _this);
includes(StarChunk, Empty, _true);
includesStrictly(StarChunk, Empty, _true);
isIncluded(StarChunk, Empty, _false);
isIncludedStrictly(StarChunk, Empty, _false);

// ***************************************************************************
// StarChunk/Chunks API
// ***************************************************************************
add(StarChunk, Chunks, function (obj) {
  const chunks = obj.chunks.filter(chunk => !this.includes(chunk));
  return new MixedChunks(this.chunk + ',' + chunks.map(chunk => chunk.chunk)
    .join(','));
});
remove(StarChunk, Chunks, _toBeImplemented);
includes(StarChunk, Chunks, _includesAll);
includesStrictly(StarChunk, Chunks, _includesAll);
isIncluded(StarChunk, Chunks, _false);
isIncludedStrictly(StarChunk, Chunks, _false);


// ***************************************************************************
// StarChunk/StarChunks API
// ***************************************************************************
add(StarChunk, StarChunks, _addTo);
remove(StarChunk, StarChunks, _toBeImplemented);
includes(StarChunk, StarChunks, _includesAll);
includesStrictly(StarChunk, StarChunks, _includesAll);
isIncluded(StarChunk, StarChunks, _isIncluded);
isIncludedStrictly(StarChunk, StarChunks, _isIncluded);


// ***************************************************************************
// StarChunk/MixedChunks API
// ***************************************************************************
add(StarChunk, MixedChunks, _addTo);
remove(StarChunk, MixedChunks, _toBeImplemented);
includes(StarChunk, MixedChunks, _includesAll);
includesStrictly(StarChunk, MixedChunks, _includesAll);
isIncluded(StarChunk, MixedChunks, _isIncluded);
isIncludedStrictly(StarChunk, MixedChunks, _isIncluded);

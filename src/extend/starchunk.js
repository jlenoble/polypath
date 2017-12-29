/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _identity, _true, _false, _equals, _includes,
  _includesAll, _includesSome, _includesNot, _includesStrictly, _isIncluded,
  _isIncludedStrictly, _overlaps, _toBeImplemented} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunk/Chunk API
// ***************************************************************************
add(StarChunk, Chunk, _toBeImplemented);
remove(StarChunk, Chunk, _toBeImplemented);
equals(StarChunk, Chunk, _false);
isDistinct(StarChunk, Chunk, _includesNot);
includes(StarChunk, Chunk, _includes);
includesStrictly(StarChunk, Chunk, _includes);
isIncluded(StarChunk, Chunk, _false);
isIncludedStrictly(StarChunk, Chunk, _false);
overlaps(StarChunk, Chunk, _includes);
overlapsStrictly(StarChunk, Chunk, _includes);


// ***************************************************************************
// StarChunk/StarChunk API
// ***************************************************************************
add(StarChunk, StarChunk, _toBeImplemented);
remove(StarChunk, StarChunk, _toBeImplemented);
equals(StarChunk, StarChunk, _equals);
isDistinct(StarChunk, StarChunk, _toBeImplemented);
includes(StarChunk, StarChunk, function (obj) {
  const chunks1 = this.chunk.split('*');
  const chunks2 = obj.chunk.split('*');
  const l = chunks2.length;

  if (l < chunks1.length || !chunks2.join('').includes(chunks1.join(''))) {
    return false;
  }

  let j = 0;
  let k = 0;
  let a1;
  let b1;
  let a2;
  let b2;

  for (let i = 0; i + j + k < l; i++) {
    a1 = chunks1[i];
    a2 = chunks2[i + j];

    if (!a2.includes(a1)) {
      return false;
    }

    b1 = chunks1[i + 1];

    do {
      k++;
      b2 = chunks2[i + k];

      if (b2 === undefined) {
        return false;
      }
    } while (!b2.includes(b1));

    j = k;
  }

  return true;
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
    if (!a2.includes(a1)) {
      return false;
    }

    return a2.substring(0, a1.length) === a1;
  }

  if (a1.substring(0, a2.length) !== a2) {
    return false;
  }

  if (!b1.includes(b2)) {
    if (!b2.includes(b1)) {
      return false;
    }

    return b2.substring(b2.length - b1.length) === b1;
  }

  if (b1.substring(b1.length - b2.length) !== b2) {
    return false;
  }

  return true;
});
overlapsStrictly(StarChunk, StarChunk, _toBeImplemented);


// ***************************************************************************
// StarChunk/Star API
// ***************************************************************************
add(StarChunk, Star, _identity);
remove(StarChunk, Star, _empty);
equals(StarChunk, Star, _false);
isDistinct(StarChunk, Star, _false);
includes(StarChunk, Star, _false);
includesStrictly(StarChunk, Star, _false);
isIncluded(StarChunk, Star, _true);
isIncludedStrictly(StarChunk, Star, _true);
overlaps(StarChunk, Star, _true);
overlapsStrictly(StarChunk, Star, _false);


// ***************************************************************************
// StarChunk/Empty API
// ***************************************************************************
add(StarChunk, Empty, _this);
remove(StarChunk, Empty, _this);
equals(StarChunk, Empty, _false);
isDistinct(StarChunk, Empty, _false);
includes(StarChunk, Empty, _true);
includesStrictly(StarChunk, Empty, _true);
isIncluded(StarChunk, Empty, _false);
isIncludedStrictly(StarChunk, Empty, _false);
overlaps(StarChunk, Empty, _true);
overlapsStrictly(StarChunk, Empty, _false);

// ***************************************************************************
// StarChunk/Chunks API
// ***************************************************************************
add(StarChunk, Chunks, _toBeImplemented);
remove(StarChunk, Chunks, _toBeImplemented);
equals(StarChunk, Chunks, _false);
isDistinct(StarChunk, Chunks, _toBeImplemented);
includes(StarChunk, Chunks, _includesAll);
includesStrictly(StarChunk, Chunks, _includesAll);
isIncluded(StarChunk, Chunks, _false);
isIncludedStrictly(StarChunk, Chunks, _false);
overlaps(StarChunk, Chunks, _includesSome);
overlapsStrictly(StarChunk, Chunks, _toBeImplemented);


// ***************************************************************************
// StarChunk/StarChunks API
// ***************************************************************************
add(StarChunk, StarChunks, _toBeImplemented);
remove(StarChunk, StarChunks, _toBeImplemented);
equals(StarChunk, StarChunks, _false);
isDistinct(StarChunk, StarChunks, _toBeImplemented);
includes(StarChunk, StarChunks, _includesAll);
includesStrictly(StarChunk, StarChunks, _includesAll);
isIncluded(StarChunk, StarChunks, _isIncluded);
isIncludedStrictly(StarChunk, StarChunks, _isIncluded);
overlaps(StarChunk, StarChunks, _overlaps);
overlapsStrictly(StarChunk, StarChunks, _toBeImplemented);


// ***************************************************************************
// StarChunk/MixedChunks API
// ***************************************************************************
add(StarChunk, MixedChunks, _toBeImplemented);
remove(StarChunk, MixedChunks, _toBeImplemented);
equals(StarChunk, MixedChunks, _false);
isDistinct(StarChunk, MixedChunks, _toBeImplemented);
includes(StarChunk, MixedChunks, _includesAll);
includesStrictly(StarChunk, MixedChunks, _includesAll);
isIncluded(StarChunk, MixedChunks, _isIncluded);
isIncludedStrictly(StarChunk, MixedChunks, _isIncluded);
overlaps(StarChunk, MixedChunks, _overlaps);
overlapsStrictly(StarChunk, MixedChunks, _toBeImplemented);

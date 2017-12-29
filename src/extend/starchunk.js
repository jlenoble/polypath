/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _identity, _true, _false, _equals, _testLeft, _multiTest,
  _multiTestMixed, _toBeImplemented} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunk/Chunk API
// ***************************************************************************
add(StarChunk, Chunk, _toBeImplemented);
remove(StarChunk, Chunk, _toBeImplemented);
equals(StarChunk, Chunk, _false);
isDistinct(StarChunk, Chunk, _toBeImplemented);
includes(StarChunk, Chunk, _testLeft);
includesStrictly(StarChunk, Chunk, _testLeft);
isIncluded(StarChunk, Chunk, _false);
isIncludedStrictly(StarChunk, Chunk, _toBeImplemented);
overlaps(StarChunk, Chunk, _testLeft);
overlapsStrictly(StarChunk, Chunk, _toBeImplemented);


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
includesStrictly(StarChunk, StarChunk, _toBeImplemented);
isIncluded(StarChunk, StarChunk, _toBeImplemented);
isIncludedStrictly(StarChunk, StarChunk, _toBeImplemented);
overlaps(StarChunk, StarChunk, _toBeImplemented);
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
includes(StarChunk, Chunks, _multiTest);
includesStrictly(StarChunk, Chunks, _toBeImplemented);
isIncluded(StarChunk, Chunks, _toBeImplemented);
isIncludedStrictly(StarChunk, Chunks, _toBeImplemented);
overlaps(StarChunk, Chunks, _toBeImplemented);
overlapsStrictly(StarChunk, Chunks, _toBeImplemented);


// ***************************************************************************
// StarChunk/StarChunks API
// ***************************************************************************
add(StarChunk, StarChunks, _toBeImplemented);
remove(StarChunk, StarChunks, _toBeImplemented);
equals(StarChunk, StarChunks, _false);
isDistinct(StarChunk, StarChunks, _toBeImplemented);
includes(StarChunk, StarChunks, _multiTest);
includesStrictly(StarChunk, StarChunks, _toBeImplemented);
isIncluded(StarChunk, StarChunks, _toBeImplemented);
isIncludedStrictly(StarChunk, StarChunks, _toBeImplemented);
overlaps(StarChunk, StarChunks, _toBeImplemented);
overlapsStrictly(StarChunk, StarChunks, _toBeImplemented);


// ***************************************************************************
// StarChunk/MixedChunks API
// ***************************************************************************
add(StarChunk, MixedChunks, _toBeImplemented);
remove(StarChunk, MixedChunks, _toBeImplemented);
equals(StarChunk, MixedChunks, _false);
isDistinct(StarChunk, MixedChunks, _toBeImplemented);
includes(StarChunk, MixedChunks, _multiTestMixed);
includesStrictly(StarChunk, MixedChunks, _toBeImplemented);
isIncluded(StarChunk, MixedChunks, _toBeImplemented);
isIncludedStrictly(StarChunk, MixedChunks, _toBeImplemented);
overlaps(StarChunk, MixedChunks, _toBeImplemented);
overlapsStrictly(StarChunk, MixedChunks, _toBeImplemented);

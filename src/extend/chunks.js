/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _false, _equals, _testLeft, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Chunks/Chunk API
// ***************************************************************************
add(Chunks, Chunk, _toBeImplemented);
remove(Chunks, Chunk, _toBeImplemented);
equals(Chunks, Chunk, _false);
isDistinct(Chunks, Chunk, _toBeImplemented);
includes(Chunks, Chunk, _testLeft);
includesStrictly(Chunks, Chunk, _toBeImplemented);
isIncluded(Chunks, Chunk, _toBeImplemented);
isIncludedStrictly(Chunks, Chunk, _toBeImplemented);
overlaps(Chunks, Chunk, _toBeImplemented);
overlapsStrictly(Chunks, Chunk, _toBeImplemented);


// ***************************************************************************
// Chunks/StarChunk API
// ***************************************************************************
add(Chunks, StarChunk, _toBeImplemented);
remove(Chunks, StarChunk, _toBeImplemented);
equals(Chunks, StarChunk, _false);
isDistinct(Chunks, StarChunk, _toBeImplemented);
includes(Chunks, StarChunk, function (obj) {
  for (let chunk of this.chunks) {
    if (!obj.test({chunk})) {
      return false;
    }
  }
  return true;
});
includesStrictly(Chunks, StarChunk, _toBeImplemented);
isIncluded(Chunks, StarChunk, _toBeImplemented);
isIncludedStrictly(Chunks, StarChunk, _toBeImplemented);
overlaps(Chunks, StarChunk, _toBeImplemented);
overlapsStrictly(Chunks, StarChunk, _toBeImplemented);


// ***************************************************************************
// Chunks/Star API
// ***************************************************************************
add(Chunks, Star, _this);
remove(Chunks, Star, _empty);
equals(Chunks, Star, _false);
isDistinct(Chunks, Star, _toBeImplemented);
includes(Chunks, Star, _toBeImplemented);
includesStrictly(Chunks, Star, _toBeImplemented);
isIncluded(Chunks, Star, _toBeImplemented);
isIncludedStrictly(Chunks, Star, _toBeImplemented);
overlaps(Chunks, Star, _toBeImplemented);
overlapsStrictly(Chunks, Star, _toBeImplemented);


// ***************************************************************************
// Chunks/Empty API
// ***************************************************************************
add(Chunks, Empty, _this);
remove(Chunks, Empty, _this);
equals(Chunks, Empty, _false);
isDistinct(Chunks, Empty, _toBeImplemented);
includes(Chunks, Empty, _toBeImplemented);
includesStrictly(Chunks, Empty, _toBeImplemented);
isIncluded(Chunks, Empty, _toBeImplemented);
isIncludedStrictly(Chunks, Empty, _toBeImplemented);
overlaps(Chunks, Empty, _toBeImplemented);
overlapsStrictly(Chunks, Empty, _toBeImplemented);


// ***************************************************************************
// Chunks/Chunks API
// ***************************************************************************
add(Chunks, Chunks, _toBeImplemented);
remove(Chunks, Chunks, _toBeImplemented);
equals(Chunks, Chunks, _equals);
isDistinct(Chunks, Chunks, _toBeImplemented);
includes(Chunks, Chunks, function (obj) {
  for (let chunk of obj.chunks) {
    if (!this.test({chunk})) {
      return false;
    }
  }
  return true;
});
includesStrictly(Chunks, Chunks, _toBeImplemented);
isIncluded(Chunks, Chunks, _toBeImplemented);
isIncludedStrictly(Chunks, Chunks, _toBeImplemented);
overlaps(Chunks, Chunks, _toBeImplemented);
overlapsStrictly(Chunks, Chunks, _toBeImplemented);


// ***************************************************************************
// Chunks/StarChunks API
// ***************************************************************************
add(Chunks, StarChunks, _toBeImplemented);
remove(Chunks, StarChunks, _toBeImplemented);
equals(Chunks, StarChunks, _false);
isDistinct(Chunks, StarChunks, _toBeImplemented);
includes(Chunks, StarChunks, function (obj) {
  for (let chunk of obj.chunks) {
    if (!this.includes(chunk)) {
      return false;
    }
  }
  return true;
});
includesStrictly(Chunks, StarChunks, _toBeImplemented);
isIncluded(Chunks, StarChunks, _toBeImplemented);
isIncludedStrictly(Chunks, StarChunks, _toBeImplemented);
overlaps(Chunks, StarChunks, _toBeImplemented);
overlapsStrictly(Chunks, StarChunks, _toBeImplemented);


// ***************************************************************************
// Chunks/MixedChunks API
// ***************************************************************************
add(Chunks, MixedChunks, _toBeImplemented);
remove(Chunks, MixedChunks, _toBeImplemented);
equals(Chunks, MixedChunks, _false);
isDistinct(Chunks, MixedChunks, _toBeImplemented);
includes(Chunks, MixedChunks, function (obj) {
  for (let chunk of obj.chunks.chunks) {
    if (!this.test({chunk})) {
      return false;
    }
  }
  for (let chunk of obj.starchunks.chunks) {
    if (!this.includes(chunk)) {
      return false;
    }
  }
  return true;
});
includesStrictly(Chunks, MixedChunks, _toBeImplemented);
isIncluded(Chunks, MixedChunks, _toBeImplemented);
isIncludedStrictly(Chunks, MixedChunks, _toBeImplemented);
overlaps(Chunks, MixedChunks, _toBeImplemented);
overlapsStrictly(Chunks, MixedChunks, _toBeImplemented);

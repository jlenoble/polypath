/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _false, _equals, _testLeft, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunks/Chunk API
// ***************************************************************************
add(StarChunks, Chunk, _toBeImplemented);
remove(StarChunks, Chunk, _toBeImplemented);
equals(StarChunks, Chunk, _false);
isDistinct(StarChunks, Chunk, _toBeImplemented);
includes(StarChunks, Chunk, _testLeft);
includesStrictly(StarChunks, Chunk, _toBeImplemented);
isIncluded(StarChunks, Chunk, _toBeImplemented);
isIncludedStrictly(StarChunks, Chunk, _toBeImplemented);
overlaps(StarChunks, Chunk, _toBeImplemented);
overlapsStrictly(StarChunks, Chunk, _toBeImplemented);


// ***************************************************************************
// StarChunks/StarChunk API
// ***************************************************************************
add(StarChunks, StarChunk, _toBeImplemented);
remove(StarChunks, StarChunk, _toBeImplemented);
equals(StarChunks, StarChunk, _false);
isDistinct(StarChunks, StarChunk, _toBeImplemented);
includes(StarChunks, StarChunk, function (obj) {
  for (let chunk of this.chunks) {
    if (chunk.includes(obj)) {
      return true;
    }
  }
  return false;
});
includesStrictly(StarChunks, StarChunk, _toBeImplemented);
isIncluded(StarChunks, StarChunk, _toBeImplemented);
isIncludedStrictly(StarChunks, StarChunk, _toBeImplemented);
overlaps(StarChunks, StarChunk, _toBeImplemented);
overlapsStrictly(StarChunks, StarChunk, _toBeImplemented);


// ***************************************************************************
// StarChunks/Star API
// ***************************************************************************
add(StarChunks, Star, _this);
remove(StarChunks, Star, _empty);
equals(StarChunks, Star, _false);
isDistinct(StarChunks, Star, _toBeImplemented);
includes(StarChunks, Star, _toBeImplemented);
includesStrictly(StarChunks, Star, _toBeImplemented);
isIncluded(StarChunks, Star, _toBeImplemented);
isIncludedStrictly(StarChunks, Star, _toBeImplemented);
overlaps(StarChunks, Star, _toBeImplemented);
overlapsStrictly(StarChunks, Star, _toBeImplemented);


// ***************************************************************************
// StarChunks/Empty API
// ***************************************************************************
add(StarChunks, Empty, _this);
remove(StarChunks, Empty, _this);
equals(StarChunks, Empty, _false);
isDistinct(StarChunks, Empty, _toBeImplemented);
includes(StarChunks, Empty, _toBeImplemented);
includesStrictly(StarChunks, Empty, _toBeImplemented);
isIncluded(StarChunks, Empty, _toBeImplemented);
isIncludedStrictly(StarChunks, Empty, _toBeImplemented);
overlaps(StarChunks, Empty, _toBeImplemented);
overlapsStrictly(StarChunks, Empty, _toBeImplemented);


// ***************************************************************************
// StarChunks/Chunks API
// ***************************************************************************
add(StarChunks, Chunks, _toBeImplemented);
remove(StarChunks, Chunks, _toBeImplemented);
equals(StarChunks, Chunks, _false);
isDistinct(StarChunks, Chunks, _toBeImplemented);
includes(StarChunks, Chunks, function (obj) {
  for (let chunk of obj.chunks) {
    let found = false;
    for (let chunk2 of this.chunks) {
      if (chunk2.test({chunk})) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
});
includesStrictly(StarChunks, Chunks, _toBeImplemented);
isIncluded(StarChunks, Chunks, _toBeImplemented);
isIncludedStrictly(StarChunks, Chunks, _toBeImplemented);
overlaps(StarChunks, Chunks, _toBeImplemented);
overlapsStrictly(StarChunks, Chunks, _toBeImplemented);


// ***************************************************************************
// StarChunks/StarChunks API
// ***************************************************************************
add(StarChunks, StarChunks, _toBeImplemented);
remove(StarChunks, StarChunks, _toBeImplemented);
equals(StarChunks, StarChunks, _equals);
isDistinct(StarChunks, StarChunks, _toBeImplemented);
includes(StarChunks, StarChunks, function (obj) {
  for (let chunk of obj.chunks) {
    let found = false;
    for (let chunk2 of this.chunks) {
      if (chunk2.includes(chunk)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
});
includesStrictly(StarChunks, StarChunks, _toBeImplemented);
isIncluded(StarChunks, StarChunks, _toBeImplemented);
isIncludedStrictly(StarChunks, StarChunks, _toBeImplemented);
overlaps(StarChunks, StarChunks, _toBeImplemented);
overlapsStrictly(StarChunks, StarChunks, _toBeImplemented);


// ***************************************************************************
// StarChunks/MixedChunks API
// ***************************************************************************
add(StarChunks, MixedChunks, _toBeImplemented);
remove(StarChunks, MixedChunks, _toBeImplemented);
equals(StarChunks, MixedChunks, _false);
isDistinct(StarChunks, MixedChunks, _toBeImplemented);
includes(StarChunks, MixedChunks, function (obj) {
  for (let chunk of obj.chunks.chunks) {
    let found = false;
    for (let chunk2 of this.chunks) {
      if (chunk2.test({chunk})) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  for (let chunk of obj.starchunks.chunks) {
    let found = false;
    for (let chunk2 of this.chunks) {
      if (chunk2.includes(chunk)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
});
includesStrictly(StarChunks, MixedChunks, _toBeImplemented);
isIncluded(StarChunks, MixedChunks, _toBeImplemented);
isIncludedStrictly(StarChunks, MixedChunks, _toBeImplemented);
overlaps(StarChunks, MixedChunks, _toBeImplemented);
overlapsStrictly(StarChunks, MixedChunks, _toBeImplemented);

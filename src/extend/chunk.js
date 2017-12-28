/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _testRight, _newChunksRight, _newMixedChunksRight}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';

const empty = new Empty();


// ***************************************************************************
// Chunk/Chunk API
// ***************************************************************************
add(Chunk, Chunk, _newChunksRight);
remove(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk ? empty : this;
});
equals(Chunk, Chunk, _testRight);
isDistinct(Chunk, Chunk, function (obj) {
  return this.chunk !== obj.chunk;
});
includes(Chunk, Chunk, _testRight);
includesStrictly(Chunk, Chunk, _false);
isIncluded(Chunk, Chunk, _testRight);
isIncludedStrictly(Chunk, Chunk, _false);
overlaps(Chunk, Chunk, _testRight);
overlapsStrictly(Chunk, Chunk, _false);


// ***************************************************************************
// Chunk/StarChunk API
// ***************************************************************************
add(Chunk, StarChunk, _newMixedChunksRight);
remove(Chunk, StarChunk, function (obj) {
  return obj.test(this.chunk) ? empty : this;
});
equals(Chunk, StarChunk, _false);
isDistinct(Chunk, StarChunk, function (obj) {
  return !obj.test(this.chunk);
});
includes(Chunk, StarChunk, _false);
includesStrictly(Chunk, StarChunk, _false);
isIncluded(Chunk, StarChunk, _testRight);
isIncludedStrictly(Chunk, StarChunk, _testRight);
overlaps(Chunk, StarChunk, _testRight);
overlapsStrictly(Chunk, StarChunk, _testRight);


// ***************************************************************************
// Chunk/Star API
// ***************************************************************************
add(Chunk, Star, function (obj) {
  return obj;
});
remove(Chunk, Star, function (obj) {
  return empty;
});
equals(Chunk, Star, _false);
isDistinct(Chunk, Star, _false);
includes(Chunk, Star, _false);
includesStrictly(Chunk, Star, _false);
isIncluded(Chunk, Star, _true);
isIncludedStrictly(Chunk, Star, _true);
overlaps(Chunk, Star, _true);
overlapsStrictly(Chunk, Star, _true);


// ***************************************************************************
// Chunk/Empty API
// ***************************************************************************
add(Chunk, Empty, function (obj) {
  return this;
});
remove(Chunk, Empty, function (obj) {
  return this;
});
equals(Chunk, Empty, _false);
isDistinct(Chunk, Empty, _false);
includes(Chunk, Empty, _true);
includesStrictly(Chunk, Empty, _true);
isIncluded(Chunk, Empty, _false);
isIncludedStrictly(Chunk, Empty, _false);
overlaps(Chunk, Empty, _true);
overlapsStrictly(Chunk, Empty, _true);


// ***************************************************************************
// Chunk/Chunks API
// ***************************************************************************
add(Chunk, Chunks, _newChunksRight);
remove(Chunk, Chunks, function (obj) {
  return obj.chunks.has(this.chunk) ? empty : this;
});
equals(Chunk, Chunks, _false);
isDistinct(Chunk, Chunks, function (obj) {
  return !obj.chunks.has(this.chunk);
});
includes(Chunk, Chunks, _false);
includesStrictly(Chunk, Chunks, _false);
isIncluded(Chunk, Chunks, _testRight);
isIncludedStrictly(Chunk, Chunks, _testRight);
overlaps(Chunk, Chunks, _testRight);
overlapsStrictly(Chunk, Chunks, _testRight);


// ***************************************************************************
// Chunk/StarChunks API
// ***************************************************************************
add(Chunk, StarChunks, _newMixedChunksRight);
remove(Chunk, StarChunks, function (obj) {
  return obj.chunks.some(chunk => chunk.regex.test(this.chunk)) ? empty : this;
});
equals(Chunk, StarChunks, _false);
isDistinct(Chunk, StarChunks, function (obj) {
  return !obj.chunks.some(chunk => chunk.regex.test(this.chunk));
});
includes(Chunk, StarChunks, _false);
includesStrictly(Chunk, StarChunks, _false);
isIncluded(Chunk, StarChunks, _testRight);
isIncludedStrictly(Chunk, StarChunks, _testRight);
overlaps(Chunk, StarChunks, _testRight);
overlapsStrictly(Chunk, StarChunks, _testRight);


// ***************************************************************************
// Chunk/MixedChunks API
// ***************************************************************************
add(Chunk, MixedChunks, _newMixedChunksRight);
remove(Chunk, MixedChunks, function (obj) {
  return obj.chunks.chunks.has(this.chunk) ||
    obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk)) ? empty :
    this;
});
equals(Chunk, MixedChunks, _false);
isDistinct(Chunk, MixedChunks, function (obj) {
  return !obj.chunks.chunks.has(this.chunk) &&
    !obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk));
});
includes(Chunk, MixedChunks, _false);
includesStrictly(Chunk, MixedChunks, _false);
isIncluded(Chunk, MixedChunks, _testRight);
isIncludedStrictly(Chunk, MixedChunks, _testRight);
overlaps(Chunk, MixedChunks, _testRight);
overlapsStrictly(Chunk, MixedChunks, _testRight);

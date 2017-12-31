/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _empty, _this, _equals, _equalsNot,
  _isIncluded, _maybeClearChunk, _addTo}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Chunk/Chunk API
// ***************************************************************************
add(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk ? this : new Chunks(
    this.chunk + ',' + obj.chunk);
});
remove(Chunk, Chunk, _maybeClearChunk);
equals(Chunk, Chunk, _equals);
isDistinct(Chunk, Chunk, _equalsNot);
includes(Chunk, Chunk, _equals);
includesStrictly(Chunk, Chunk, _false);
isIncluded(Chunk, Chunk, _equals);
isIncludedStrictly(Chunk, Chunk, _false);
overlaps(Chunk, Chunk, _equals);
overlapsStrictly(Chunk, Chunk, _false);


// ***************************************************************************
// Chunk/StarChunk API
// ***************************************************************************
add(Chunk, StarChunk, _addTo);
remove(Chunk, StarChunk, _maybeClearChunk);
includes(Chunk, StarChunk, _false);
includesStrictly(Chunk, StarChunk, _false);
isIncluded(Chunk, StarChunk, _isIncluded);
isIncludedStrictly(Chunk, StarChunk, _isIncluded);


// ***************************************************************************
// Chunk/Star API
// ***************************************************************************
remove(Chunk, Star, _empty);
includes(Chunk, Star, _false);
includesStrictly(Chunk, Star, _false);
isIncluded(Chunk, Star, _true);
isIncludedStrictly(Chunk, Star, _true);


// ***************************************************************************
// Chunk/Empty API
// ***************************************************************************
remove(Chunk, Empty, _this);
includes(Chunk, Empty, _true);
includesStrictly(Chunk, Empty, _true);
isIncluded(Chunk, Empty, _false);
isIncludedStrictly(Chunk, Empty, _false);


// ***************************************************************************
// Chunk/Chunks API
// ***************************************************************************
add(Chunk, Chunks, _addTo);
remove(Chunk, Chunks, _maybeClearChunk);
includes(Chunk, Chunks, _false);
includesStrictly(Chunk, Chunks, _false);
isIncluded(Chunk, Chunks, _isIncluded);
isIncludedStrictly(Chunk, Chunks, _isIncluded);


// ***************************************************************************
// Chunk/StarChunks API
// ***************************************************************************
add(Chunk, StarChunks, _addTo);
remove(Chunk, StarChunks, _maybeClearChunk);
includes(Chunk, StarChunks, _false);
includesStrictly(Chunk, StarChunks, _false);
isIncluded(Chunk, StarChunks, _isIncluded);
isIncludedStrictly(Chunk, StarChunks, _isIncluded);


// ***************************************************************************
// Chunk/MixedChunks API
// ***************************************************************************
add(Chunk, MixedChunks, _addTo);
remove(Chunk, MixedChunks, _maybeClearChunk);
includes(Chunk, MixedChunks, _false);
includesStrictly(Chunk, MixedChunks, _false);
isIncluded(Chunk, MixedChunks, _isIncluded);
isIncludedStrictly(Chunk, MixedChunks, _isIncluded);

/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _empty, _this, _equals, _equalsNot, _isNotIncluded,
  _isIncluded, _clearRight, _addTo, _identity}
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
remove(Chunk, Chunk, _clearRight);
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
remove(Chunk, StarChunk, _clearRight);
equals(Chunk, StarChunk, _false);
isDistinct(Chunk, StarChunk, _isNotIncluded);
includes(Chunk, StarChunk, _false);
includesStrictly(Chunk, StarChunk, _false);
isIncluded(Chunk, StarChunk, _isIncluded);
isIncludedStrictly(Chunk, StarChunk, _isIncluded);
overlaps(Chunk, StarChunk, _isIncluded);
overlapsStrictly(Chunk, StarChunk, _false);


// ***************************************************************************
// Chunk/Star API
// ***************************************************************************
add(Chunk, Star, _identity);
remove(Chunk, Star, _empty);
equals(Chunk, Star, _false);
isDistinct(Chunk, Star, _false);
includes(Chunk, Star, _false);
includesStrictly(Chunk, Star, _false);
isIncluded(Chunk, Star, _true);
isIncludedStrictly(Chunk, Star, _true);
overlaps(Chunk, Star, _true);
overlapsStrictly(Chunk, Star, _false);


// ***************************************************************************
// Chunk/Empty API
// ***************************************************************************
add(Chunk, Empty, _this);
remove(Chunk, Empty, _this);
equals(Chunk, Empty, _false);
isDistinct(Chunk, Empty, _false);
includes(Chunk, Empty, _true);
includesStrictly(Chunk, Empty, _true);
isIncluded(Chunk, Empty, _false);
isIncludedStrictly(Chunk, Empty, _false);
overlaps(Chunk, Empty, _true);
overlapsStrictly(Chunk, Empty, _false);


// ***************************************************************************
// Chunk/Chunks API
// ***************************************************************************
add(Chunk, Chunks, _addTo);
remove(Chunk, Chunks, _clearRight);
equals(Chunk, Chunks, _false);
isDistinct(Chunk, Chunks, _isNotIncluded);
includes(Chunk, Chunks, _false);
includesStrictly(Chunk, Chunks, _false);
isIncluded(Chunk, Chunks, _isIncluded);
isIncludedStrictly(Chunk, Chunks, _isIncluded);
overlaps(Chunk, Chunks, _isIncluded);
overlapsStrictly(Chunk, Chunks, _false);


// ***************************************************************************
// Chunk/StarChunks API
// ***************************************************************************
add(Chunk, StarChunks, _addTo);
remove(Chunk, StarChunks, _clearRight);
equals(Chunk, StarChunks, _false);
isDistinct(Chunk, StarChunks, _isNotIncluded);
includes(Chunk, StarChunks, _false);
includesStrictly(Chunk, StarChunks, _false);
isIncluded(Chunk, StarChunks, _isIncluded);
isIncludedStrictly(Chunk, StarChunks, _isIncluded);
overlaps(Chunk, StarChunks, _isIncluded);
overlapsStrictly(Chunk, StarChunks, _false);


// ***************************************************************************
// Chunk/MixedChunks API
// ***************************************************************************
add(Chunk, MixedChunks, _addTo);
remove(Chunk, MixedChunks, _clearRight);
equals(Chunk, MixedChunks, _false);
isDistinct(Chunk, MixedChunks, _isNotIncluded);
includes(Chunk, MixedChunks, _false);
includesStrictly(Chunk, MixedChunks, _false);
isIncluded(Chunk, MixedChunks, _isIncluded);
isIncludedStrictly(Chunk, MixedChunks, _isIncluded);
overlaps(Chunk, MixedChunks, _isIncluded);
overlapsStrictly(Chunk, MixedChunks, _false);

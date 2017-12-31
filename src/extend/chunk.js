/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _empty, _this, _equals, _equalsNot,
  _isIncluded, _maybeClearChunk}
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
isIncludedStrictly(Chunk, Chunk, _false);
overlaps(Chunk, Chunk, _equals);
overlapsStrictly(Chunk, Chunk, _false);


// ***************************************************************************
// Chunk/StarChunk API
// ***************************************************************************
remove(Chunk, StarChunk, _maybeClearChunk);
includes(Chunk, StarChunk, _false);
isIncludedStrictly(Chunk, StarChunk, _isIncluded);


// ***************************************************************************
// Chunk/Star API
// ***************************************************************************
remove(Chunk, Star, _empty);
includes(Chunk, Star, _false);
isIncludedStrictly(Chunk, Star, _true);


// ***************************************************************************
// Chunk/Empty API
// ***************************************************************************
remove(Chunk, Empty, _this);
includes(Chunk, Empty, _true);
isIncludedStrictly(Chunk, Empty, _false);


// ***************************************************************************
// Chunk/Chunks API
// ***************************************************************************
remove(Chunk, Chunks, _maybeClearChunk);
includes(Chunk, Chunks, _false);
isIncludedStrictly(Chunk, Chunks, _isIncluded);


// ***************************************************************************
// Chunk/StarChunks API
// ***************************************************************************
remove(Chunk, StarChunks, _maybeClearChunk);
includes(Chunk, StarChunks, _false);
isIncludedStrictly(Chunk, StarChunks, _isIncluded);


// ***************************************************************************
// Chunk/MixedChunks API
// ***************************************************************************
remove(Chunk, MixedChunks, _maybeClearChunk);
includes(Chunk, MixedChunks, _false);
isIncludedStrictly(Chunk, MixedChunks, _isIncluded);

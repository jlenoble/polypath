/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _true, _false, _equals, _isDistinct,
  _includes, _includesAll, _includesSome, _includesNot,
  _isIncluded, _isIncludedStrictly, _overlapsSingle,
  _overlapsStrictly, _filterChunks} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Chunks/Chunk API
// ***************************************************************************
add(Chunks, Chunk, function (obj) {
  return this.includes(obj) ? this : new Chunks(this.chunk + ',' + obj.chunk);
});
remove(Chunks, Chunk, _filterChunks);
equals(Chunks, Chunk, _false);
isDistinct(Chunks, Chunk, _includesNot);
includes(Chunks, Chunk, _includes);
isIncludedStrictly(Chunks, Chunk, _false);
overlaps(Chunks, Chunk, _includes);
overlapsStrictly(Chunks, Chunk, _false);


// ***************************************************************************
// Chunks/StarChunk API
// ***************************************************************************
add(Chunks, StarChunk, function (obj) {
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  return new MixedChunks(chunks.map(chunk => chunk.chunk).join(',') + ',' +
    obj.chunk);
});
remove(Chunks, StarChunk, _filterChunks);
equals(Chunks, StarChunk, _false);
isDistinct(Chunks, StarChunk, _isDistinct);
includes(Chunks, StarChunk, _false);
isIncludedStrictly(Chunks, StarChunk, _isIncluded);
overlaps(Chunks, StarChunk, _overlapsSingle);
overlapsStrictly(Chunks, StarChunk, _overlapsStrictly);


// ***************************************************************************
// Chunks/Star API
// ***************************************************************************
remove(Chunks, Star, _empty);
includes(Chunks, Star, _false);
isIncludedStrictly(Chunks, Star, _true);


// ***************************************************************************
// Chunks/Empty API
// ***************************************************************************
remove(Chunks, Empty, _this);
includes(Chunks, Empty, _true);
isIncludedStrictly(Chunks, Empty, _false);


// ***************************************************************************
// Chunks/Chunks API
// ***************************************************************************
add(Chunks, Chunks, function (obj) {
  return new Chunks(this.chunk + ',' + obj.chunk);
});
remove(Chunks, Chunks, _filterChunks);
equals(Chunks, Chunks, _equals);
isDistinct(Chunks, Chunks, _isDistinct);
includes(Chunks, Chunks, _includesAll);
isIncludedStrictly(Chunks, Chunks, _isIncludedStrictly);
overlaps(Chunks, Chunks, _includesSome);
overlapsStrictly(Chunks, Chunks, _overlapsStrictly);


// ***************************************************************************
// Chunks/StarChunks API
// ***************************************************************************
remove(Chunks, StarChunks, _filterChunks);
includes(Chunks, StarChunks, _false);
isIncludedStrictly(Chunks, StarChunks, _isIncluded);


// ***************************************************************************
// Chunks/MixedChunks API
// ***************************************************************************
remove(Chunks, MixedChunks, _filterChunks);
includes(Chunks, MixedChunks, _false);
isIncludedStrictly(Chunks, MixedChunks, _isIncluded);

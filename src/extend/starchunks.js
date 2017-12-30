/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _identity, _true, _false, _equals, _isDistinct,
  _includes, _includesAll, _includesSome, _includesNot, _isIncluded,
  _includesStrictly, _isIncludedStrictly, _overlaps, _overlapsStrictly,
  _isOverlapped, _addTo, _addMixed, _addReduce, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunks/Chunk API
// ***************************************************************************
add(StarChunks, Chunk, _addMixed);
remove(StarChunks, Chunk, _toBeImplemented);
equals(StarChunks, Chunk, _false);
isDistinct(StarChunks, Chunk, _includesNot);
includes(StarChunks, Chunk, _includes);
includesStrictly(StarChunks, Chunk, _includes);
isIncluded(StarChunks, Chunk, _false);
isIncludedStrictly(StarChunks, Chunk, _false);
overlaps(StarChunks, Chunk, _includes);
overlapsStrictly(StarChunks, Chunk, _false);


// ***************************************************************************
// StarChunks/StarChunk API
// ***************************************************************************
add(StarChunks, StarChunk, function (obj) {
  if (this.includes(obj)) {
    return this;
  }
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  return chunks.length ? new StarChunks(chunks.map(chunk => chunk.chunk)
    .concat(obj.chunk).join(',')) : obj;
});
remove(StarChunks, StarChunk, _toBeImplemented);
equals(StarChunks, StarChunk, _false);
isDistinct(StarChunks, StarChunk, _isDistinct);
includes(StarChunks, StarChunk, _includes);
includesStrictly(StarChunks, StarChunk, _includes);
isIncluded(StarChunks, StarChunk, _isIncluded);
isIncludedStrictly(StarChunks, StarChunk, _isIncluded);
overlaps(StarChunks, StarChunk, _isOverlapped);
overlapsStrictly(StarChunks, StarChunk, _overlapsStrictly);


// ***************************************************************************
// StarChunks/Star API
// ***************************************************************************
add(StarChunks, Star, _identity);
remove(StarChunks, Star, _empty);
equals(StarChunks, Star, _false);
isDistinct(StarChunks, Star, _false);
includes(StarChunks, Star, _false);
includesStrictly(StarChunks, Star, _false);
isIncluded(StarChunks, Star, _true);
isIncludedStrictly(StarChunks, Star, _true);
overlaps(StarChunks, Star, _true);
overlapsStrictly(StarChunks, Star, _false);


// ***************************************************************************
// StarChunks/Empty API
// ***************************************************************************
add(StarChunks, Empty, _this);
remove(StarChunks, Empty, _this);
isDistinct(StarChunks, Empty, _false);
includes(StarChunks, Empty, _true);
includesStrictly(StarChunks, Empty, _true);
isIncluded(StarChunks, Empty, _false);
isIncludedStrictly(StarChunks, Empty, _false);
overlaps(StarChunks, Empty, _true);
overlapsStrictly(StarChunks, Empty, _false);


// ***************************************************************************
// StarChunks/Chunks API
// ***************************************************************************
add(StarChunks, Chunks, _addReduce);
remove(StarChunks, Chunks, _toBeImplemented);
equals(StarChunks, Chunks, _false);
isDistinct(StarChunks, Chunks, _isDistinct);
includes(StarChunks, Chunks, _includesAll);
includesStrictly(StarChunks, Chunks, _includesAll);
isIncluded(StarChunks, Chunks, _false);
isIncludedStrictly(StarChunks, Chunks, _false);
overlaps(StarChunks, Chunks, _includesSome);
overlapsStrictly(StarChunks, Chunks, _overlapsStrictly);


// ***************************************************************************
// StarChunks/StarChunks API
// ***************************************************************************
add(StarChunks, StarChunks, _addReduce);
remove(StarChunks, StarChunks, _toBeImplemented);
equals(StarChunks, StarChunks, _equals);
isDistinct(StarChunks, StarChunks, _isDistinct);
includes(StarChunks, StarChunks, _includesAll);
includesStrictly(StarChunks, StarChunks, _includesStrictly);
isIncluded(StarChunks, StarChunks, _isIncluded);
isIncludedStrictly(StarChunks, StarChunks, _isIncludedStrictly);
overlaps(StarChunks, StarChunks, _overlaps);
overlapsStrictly(StarChunks, StarChunks, _overlapsStrictly);


// ***************************************************************************
// StarChunks/MixedChunks API
// ***************************************************************************
add(StarChunks, MixedChunks, _addTo);
remove(StarChunks, MixedChunks, _toBeImplemented);
equals(StarChunks, MixedChunks, _false);
isDistinct(StarChunks, MixedChunks, _isDistinct);
includes(StarChunks, MixedChunks, _includesAll);
includesStrictly(StarChunks, MixedChunks, _includesAll);
isIncluded(StarChunks, MixedChunks, _isIncluded);
isIncludedStrictly(StarChunks, MixedChunks, _isIncluded);
overlaps(StarChunks, MixedChunks, _overlaps);
overlapsStrictly(StarChunks, MixedChunks, _overlapsStrictly);

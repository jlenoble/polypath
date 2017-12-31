/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _true, _false, _equals, _isDistinct,
  _includes, _includesAll, _includesSome, _includesNot, _isIncluded,
  _isIncludedStrictly, _overlaps, _overlapsStrictly,
  _overlapsSingle, _addMixed, _addReduce, _toBeImplemented}
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
isIncludedStrictly(StarChunks, StarChunk, _isIncluded);
overlaps(StarChunks, StarChunk, _overlapsSingle);
overlapsStrictly(StarChunks, StarChunk, _overlapsStrictly);


// ***************************************************************************
// StarChunks/Star API
// ***************************************************************************
remove(StarChunks, Star, _empty);
includes(StarChunks, Star, _false);
isIncludedStrictly(StarChunks, Star, _true);


// ***************************************************************************
// StarChunks/Empty API
// ***************************************************************************
remove(StarChunks, Empty, _this);
includes(StarChunks, Empty, _true);
isIncludedStrictly(StarChunks, Empty, _false);


// ***************************************************************************
// StarChunks/Chunks API
// ***************************************************************************
add(StarChunks, Chunks, _addReduce);
remove(StarChunks, Chunks, _toBeImplemented);
equals(StarChunks, Chunks, _false);
isDistinct(StarChunks, Chunks, _isDistinct);
includes(StarChunks, Chunks, _includesAll);
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
isIncludedStrictly(StarChunks, StarChunks, _isIncludedStrictly);
overlaps(StarChunks, StarChunks, _overlaps);
overlapsStrictly(StarChunks, StarChunks, _overlapsStrictly);


// ***************************************************************************
// StarChunks/MixedChunks API
// ***************************************************************************
remove(StarChunks, MixedChunks, _toBeImplemented);
includes(StarChunks, MixedChunks, _includesAll);
isIncludedStrictly(StarChunks, MixedChunks, _isIncluded);

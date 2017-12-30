/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _identity, _true, _false, _equals, _isDistinct,
  _includes, _includesAll, _includesSome, _includesNot, _isIncluded,
  _includesStrictly, _isIncludedStrictly, _overlaps, _overlapsStrictly,
  _isOverlapped, _addMixed, _addReduce, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// MixedChunks/Chunk API
// ***************************************************************************
add(MixedChunks, Chunk, _addMixed);
remove(MixedChunks, Chunk, _toBeImplemented);
equals(MixedChunks, Chunk, _false);
isDistinct(MixedChunks, Chunk, _includesNot);
includes(MixedChunks, Chunk, _includes);
includesStrictly(MixedChunks, Chunk, _includes);
isIncluded(MixedChunks, Chunk, _false);
isIncludedStrictly(MixedChunks, Chunk, _false);
overlaps(MixedChunks, Chunk, _includes);
overlapsStrictly(MixedChunks, Chunk, _false);


// ***************************************************************************
// MixedChunks/StarChunk API
// ***************************************************************************
add(MixedChunks, StarChunk, function (obj) {
  if (this.includes(obj)) {
    return this;
  }
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  if (!chunks.length) {
    return obj;
  }
  const _chunks = chunks.map(chunk => chunk.chunk).concat(obj.chunk).join(',');
  return chunks.filter(chunk => !chunk.regex).length ?
    new MixedChunks(_chunks) : new StarChunks(_chunks);
});
remove(MixedChunks, StarChunk, _toBeImplemented);
equals(MixedChunks, StarChunk, _false);
isDistinct(MixedChunks, StarChunk, _isDistinct);
includes(MixedChunks, StarChunk, _includes);
includesStrictly(MixedChunks, StarChunk, _includes);
isIncluded(MixedChunks, StarChunk, _isIncluded);
isIncludedStrictly(MixedChunks, StarChunk, _isIncluded);
overlaps(MixedChunks, StarChunk, _isOverlapped);
overlapsStrictly(MixedChunks, StarChunk, _overlapsStrictly);


// ***************************************************************************
// MixedChunks/Star API
// ***************************************************************************
add(MixedChunks, Star, _identity);
remove(MixedChunks, Star, _empty);
equals(MixedChunks, Star, _false);
isDistinct(MixedChunks, Star, _false);
includes(MixedChunks, Star, _false);
includesStrictly(MixedChunks, Star, _false);
isIncluded(MixedChunks, Star, _true);
isIncludedStrictly(MixedChunks, Star, _true);
overlaps(MixedChunks, Star, _true);
overlapsStrictly(MixedChunks, Star, _false);


// ***************************************************************************
// MixedChunks/Empty API
// ***************************************************************************
add(MixedChunks, Empty, _this);
remove(MixedChunks, Empty, _this);
isDistinct(MixedChunks, Empty, _false);
includes(MixedChunks, Empty, _true);
includesStrictly(MixedChunks, Empty, _true);
isIncluded(MixedChunks, Empty, _false);
isIncludedStrictly(MixedChunks, Empty, _false);
overlaps(MixedChunks, Empty, _true);
overlapsStrictly(MixedChunks, Empty, _false);


// ***************************************************************************
// MixedChunks/Chunks API
// ***************************************************************************
add(MixedChunks, Chunks, _addReduce);
remove(MixedChunks, Chunks, _toBeImplemented);
equals(MixedChunks, Chunks, _false);
isDistinct(MixedChunks, Chunks, _isDistinct);
includes(MixedChunks, Chunks, _includesAll);
includesStrictly(MixedChunks, Chunks, _includesAll);
isIncluded(MixedChunks, Chunks, _false);
isIncludedStrictly(MixedChunks, Chunks, _false);
overlaps(MixedChunks, Chunks, _includesSome);
overlapsStrictly(MixedChunks, Chunks, _overlapsStrictly);


// ***************************************************************************
// MixedChunks/StarChunks API
// ***************************************************************************
add(MixedChunks, StarChunks, _addReduce);
remove(MixedChunks, StarChunks, _toBeImplemented);
equals(MixedChunks, StarChunks, _false);
isDistinct(MixedChunks, StarChunks, _isDistinct);
includes(MixedChunks, StarChunks, _includesAll);
includesStrictly(MixedChunks, StarChunks, _includesAll);
isIncluded(MixedChunks, StarChunks, _isIncluded);
isIncludedStrictly(MixedChunks, StarChunks, _isIncluded);
overlaps(MixedChunks, StarChunks, _overlaps);
overlapsStrictly(MixedChunks, StarChunks, _overlapsStrictly);


// ***************************************************************************
// MixedChunks/MixedChunks API
// ***************************************************************************
add(MixedChunks, MixedChunks, _addReduce);
remove(MixedChunks, MixedChunks, _toBeImplemented);
equals(MixedChunks, MixedChunks, _equals);
isDistinct(MixedChunks, MixedChunks, _isDistinct);
includes(MixedChunks, MixedChunks, _includesAll);
includesStrictly(MixedChunks, MixedChunks, _includesStrictly);
isIncluded(MixedChunks, MixedChunks, _isIncluded);
isIncludedStrictly(MixedChunks, MixedChunks, _isIncludedStrictly);
overlaps(MixedChunks, MixedChunks, _overlaps);
overlapsStrictly(MixedChunks, MixedChunks, _overlapsStrictly);

/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _identity, _true, _false, _equals, _includes,
  _includesAll, _isIncluded, _toBeImplemented} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// MixedChunks/Chunk API
// ***************************************************************************
add(MixedChunks, Chunk, _toBeImplemented);
remove(MixedChunks, Chunk, _toBeImplemented);
equals(MixedChunks, Chunk, _false);
isDistinct(MixedChunks, Chunk, _toBeImplemented);
includes(MixedChunks, Chunk, _includes);
includesStrictly(MixedChunks, Chunk, _toBeImplemented);
isIncluded(MixedChunks, Chunk, _false);
isIncludedStrictly(MixedChunks, Chunk, _toBeImplemented);
overlaps(MixedChunks, Chunk, _toBeImplemented);
overlapsStrictly(MixedChunks, Chunk, _toBeImplemented);


// ***************************************************************************
// MixedChunks/StarChunk API
// ***************************************************************************
add(MixedChunks, StarChunk, _toBeImplemented);
remove(MixedChunks, StarChunk, _toBeImplemented);
equals(MixedChunks, StarChunk, _false);
isDistinct(MixedChunks, StarChunk, _toBeImplemented);
includes(MixedChunks, StarChunk, _includes);
includesStrictly(MixedChunks, StarChunk, _toBeImplemented);
isIncluded(MixedChunks, StarChunk, _isIncluded);
isIncludedStrictly(MixedChunks, StarChunk, _toBeImplemented);
overlaps(MixedChunks, StarChunk, _toBeImplemented);
overlapsStrictly(MixedChunks, StarChunk, _toBeImplemented);


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
equals(MixedChunks, Empty, _false);
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
add(MixedChunks, Chunks, _toBeImplemented);
remove(MixedChunks, Chunks, _toBeImplemented);
equals(MixedChunks, Chunks, _false);
isDistinct(MixedChunks, Chunks, _toBeImplemented);
includes(MixedChunks, Chunks, _includesAll);
includesStrictly(MixedChunks, Chunks, _toBeImplemented);
isIncluded(MixedChunks, Chunks, _false);
isIncludedStrictly(MixedChunks, Chunks, _toBeImplemented);
overlaps(MixedChunks, Chunks, _toBeImplemented);
overlapsStrictly(MixedChunks, Chunks, _toBeImplemented);


// ***************************************************************************
// MixedChunks/StarChunks API
// ***************************************************************************
add(MixedChunks, StarChunks, _toBeImplemented);
remove(MixedChunks, StarChunks, _toBeImplemented);
equals(MixedChunks, StarChunks, _false);
isDistinct(MixedChunks, StarChunks, _toBeImplemented);
includes(MixedChunks, StarChunks, _includesAll);
includesStrictly(MixedChunks, StarChunks, _toBeImplemented);
isIncluded(MixedChunks, StarChunks, _isIncluded);
isIncludedStrictly(MixedChunks, StarChunks, _toBeImplemented);
overlaps(MixedChunks, StarChunks, _toBeImplemented);
overlapsStrictly(MixedChunks, StarChunks, _toBeImplemented);


// ***************************************************************************
// MixedChunks/MixedChunks API
// ***************************************************************************
add(MixedChunks, MixedChunks, _toBeImplemented);
remove(MixedChunks, MixedChunks, _toBeImplemented);
equals(MixedChunks, MixedChunks, _equals);
isDistinct(MixedChunks, MixedChunks, _toBeImplemented);
includes(MixedChunks, MixedChunks, _includesAll);
includesStrictly(MixedChunks, MixedChunks, _toBeImplemented);
isIncluded(MixedChunks, MixedChunks, _isIncluded);
isIncludedStrictly(MixedChunks, MixedChunks, _toBeImplemented);
overlaps(MixedChunks, MixedChunks, _toBeImplemented);
overlapsStrictly(MixedChunks, MixedChunks, _toBeImplemented);

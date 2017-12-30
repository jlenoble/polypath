/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _identity, _true, _false, _equals, _isDistinct,
  _includes, _includesAll, _includesSome, _includesNot, _includesStrictly,
  _isIncluded, _isIncludedStrictly, _overlaps, _isOverlapped, _overlapsStrictly,
  _toBeImplemented} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Chunks/Chunk API
// ***************************************************************************
add(Chunks, Chunk, _toBeImplemented);
remove(Chunks, Chunk, _toBeImplemented);
equals(Chunks, Chunk, _false);
isDistinct(Chunks, Chunk, _includesNot);
includes(Chunks, Chunk, _includes);
includesStrictly(Chunks, Chunk, _includes);
isIncluded(Chunks, Chunk, _false);
isIncludedStrictly(Chunks, Chunk, _false);
overlaps(Chunks, Chunk, _includes);
overlapsStrictly(Chunks, Chunk, _false);


// ***************************************************************************
// Chunks/StarChunk API
// ***************************************************************************
add(Chunks, StarChunk, _toBeImplemented);
remove(Chunks, StarChunk, _toBeImplemented);
equals(Chunks, StarChunk, _false);
isDistinct(Chunks, StarChunk, _isDistinct);
includes(Chunks, StarChunk, _false);
includesStrictly(Chunks, StarChunk, _false);
isIncluded(Chunks, StarChunk, _isIncluded);
isIncludedStrictly(Chunks, StarChunk, _isIncluded);
overlaps(Chunks, StarChunk, _isOverlapped);
overlapsStrictly(Chunks, StarChunk, _overlapsStrictly);


// ***************************************************************************
// Chunks/Star API
// ***************************************************************************
add(Chunks, Star, _identity);
remove(Chunks, Star, _empty);
equals(Chunks, Star, _false);
isDistinct(Chunks, Star, _false);
includes(Chunks, Star, _false);
includesStrictly(Chunks, Star, _false);
isIncluded(Chunks, Star, _true);
isIncludedStrictly(Chunks, Star, _true);
overlaps(Chunks, Star, _true);
overlapsStrictly(Chunks, Star, _false);


// ***************************************************************************
// Chunks/Empty API
// ***************************************************************************
add(Chunks, Empty, _this);
remove(Chunks, Empty, _this);
equals(Chunks, Empty, _false);
isDistinct(Chunks, Empty, _false);
includes(Chunks, Empty, _true);
includesStrictly(Chunks, Empty, _true);
isIncluded(Chunks, Empty, _false);
isIncludedStrictly(Chunks, Empty, _false);
overlaps(Chunks, Empty, _true);
overlapsStrictly(Chunks, Empty, _false);


// ***************************************************************************
// Chunks/Chunks API
// ***************************************************************************
add(Chunks, Chunks, _toBeImplemented);
remove(Chunks, Chunks, _toBeImplemented);
equals(Chunks, Chunks, _equals);
isDistinct(Chunks, Chunks, _isDistinct);
includes(Chunks, Chunks, _includesAll);
includesStrictly(Chunks, Chunks, _includesStrictly);
isIncluded(Chunks, Chunks, _isIncluded);
isIncludedStrictly(Chunks, Chunks, _isIncludedStrictly);
overlaps(Chunks, Chunks, _includesSome);
overlapsStrictly(Chunks, Chunks, _overlapsStrictly);


// ***************************************************************************
// Chunks/StarChunks API
// ***************************************************************************
add(Chunks, StarChunks, _toBeImplemented);
remove(Chunks, StarChunks, _toBeImplemented);
equals(Chunks, StarChunks, _false);
isDistinct(Chunks, StarChunks, _isDistinct);
includes(Chunks, StarChunks, _false);
includesStrictly(Chunks, StarChunks, _false);
isIncluded(Chunks, StarChunks, _isIncluded);
isIncludedStrictly(Chunks, StarChunks, _isIncluded);
overlaps(Chunks, StarChunks, _overlaps);
overlapsStrictly(Chunks, StarChunks, _overlapsStrictly);


// ***************************************************************************
// Chunks/MixedChunks API
// ***************************************************************************
add(Chunks, MixedChunks, _toBeImplemented);
remove(Chunks, MixedChunks, _toBeImplemented);
equals(Chunks, MixedChunks, _false);
isDistinct(Chunks, MixedChunks, _isDistinct);
includes(Chunks, MixedChunks, _false);
includesStrictly(Chunks, MixedChunks, _false);
isIncluded(Chunks, MixedChunks, _isIncluded);
isIncludedStrictly(Chunks, MixedChunks, _isIncluded);
overlaps(Chunks, MixedChunks, _overlaps);
overlapsStrictly(Chunks, MixedChunks, _overlapsStrictly);

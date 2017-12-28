/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _toBeImplemented} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunk/Chunk API
// ***************************************************************************
add(StarChunk, Chunk, _toBeImplemented);
remove(StarChunk, Chunk, _toBeImplemented);
equals(StarChunk, Chunk, _toBeImplemented);
isDistinct(StarChunk, Chunk, _toBeImplemented);
includes(StarChunk, Chunk, _toBeImplemented);
includesStrictly(StarChunk, Chunk, _toBeImplemented);
isIncluded(StarChunk, Chunk, _toBeImplemented);
isIncludedStrictly(StarChunk, Chunk, _toBeImplemented);
overlaps(StarChunk, Chunk, _toBeImplemented);
overlapsStrictly(StarChunk, Chunk, _toBeImplemented);


// ***************************************************************************
// StarChunk/StarChunk API
// ***************************************************************************
add(StarChunk, StarChunk, _toBeImplemented);
remove(StarChunk, StarChunk, _toBeImplemented);
equals(StarChunk, StarChunk, _toBeImplemented);
isDistinct(StarChunk, StarChunk, _toBeImplemented);
includes(StarChunk, StarChunk, _toBeImplemented);
includesStrictly(StarChunk, StarChunk, _toBeImplemented);
isIncluded(StarChunk, StarChunk, _toBeImplemented);
isIncludedStrictly(StarChunk, StarChunk, _toBeImplemented);
overlaps(StarChunk, StarChunk, _toBeImplemented);
overlapsStrictly(StarChunk, StarChunk, _toBeImplemented);


// ***************************************************************************
// StarChunk/Star API
// ***************************************************************************
add(StarChunk, Star, _this);
remove(StarChunk, Star, _empty);
equals(StarChunk, Star, _toBeImplemented);
isDistinct(StarChunk, Star, _toBeImplemented);
includes(StarChunk, Star, _toBeImplemented);
includesStrictly(StarChunk, Star, _toBeImplemented);
isIncluded(StarChunk, Star, _toBeImplemented);
isIncludedStrictly(StarChunk, Star, _toBeImplemented);
overlaps(StarChunk, Star, _toBeImplemented);
overlapsStrictly(StarChunk, Star, _toBeImplemented);


// ***************************************************************************
// StarChunk/Empty API
// ***************************************************************************
add(StarChunk, Empty, _this);
remove(StarChunk, Empty, _this);
equals(StarChunk, Empty, _toBeImplemented);
isDistinct(StarChunk, Empty, _toBeImplemented);
includes(StarChunk, Empty, _toBeImplemented);
includesStrictly(StarChunk, Empty, _toBeImplemented);
isIncluded(StarChunk, Empty, _toBeImplemented);
isIncludedStrictly(StarChunk, Empty, _toBeImplemented);
overlaps(StarChunk, Empty, _toBeImplemented);
overlapsStrictly(StarChunk, Empty, _toBeImplemented);


// ***************************************************************************
// StarChunk/Chunks API
// ***************************************************************************
add(StarChunk, Chunks, _toBeImplemented);
remove(StarChunk, Chunks, _toBeImplemented);
equals(StarChunk, Chunks, _toBeImplemented);
isDistinct(StarChunk, Chunks, _toBeImplemented);
includes(StarChunk, Chunks, _toBeImplemented);
includesStrictly(StarChunk, Chunks, _toBeImplemented);
isIncluded(StarChunk, Chunks, _toBeImplemented);
isIncludedStrictly(StarChunk, Chunks, _toBeImplemented);
overlaps(StarChunk, Chunks, _toBeImplemented);
overlapsStrictly(StarChunk, Chunks, _toBeImplemented);


// ***************************************************************************
// StarChunk/StarChunks API
// ***************************************************************************
add(StarChunk, StarChunks, _toBeImplemented);
remove(StarChunk, StarChunks, _toBeImplemented);
equals(StarChunk, StarChunks, _toBeImplemented);
isDistinct(StarChunk, StarChunks, _toBeImplemented);
includes(StarChunk, StarChunks, _toBeImplemented);
includesStrictly(StarChunk, StarChunks, _toBeImplemented);
isIncluded(StarChunk, StarChunks, _toBeImplemented);
isIncludedStrictly(StarChunk, StarChunks, _toBeImplemented);
overlaps(StarChunk, StarChunks, _toBeImplemented);
overlapsStrictly(StarChunk, StarChunks, _toBeImplemented);


// ***************************************************************************
// StarChunk/MixedChunks API
// ***************************************************************************
add(StarChunk, MixedChunks, _toBeImplemented);
remove(StarChunk, MixedChunks, _toBeImplemented);
equals(StarChunk, MixedChunks, _toBeImplemented);
isDistinct(StarChunk, MixedChunks, _toBeImplemented);
includes(StarChunk, MixedChunks, _toBeImplemented);
includesStrictly(StarChunk, MixedChunks, _toBeImplemented);
isIncluded(StarChunk, MixedChunks, _toBeImplemented);
isIncludedStrictly(StarChunk, MixedChunks, _toBeImplemented);
overlaps(StarChunk, MixedChunks, _toBeImplemented);
overlapsStrictly(StarChunk, MixedChunks, _toBeImplemented);

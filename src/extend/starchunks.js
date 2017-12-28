/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _toBeImplemented} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunks/Chunk API
// ***************************************************************************
add(StarChunks, Chunk, _toBeImplemented);
remove(StarChunks, Chunk, _toBeImplemented);
equals(StarChunks, Chunk, _toBeImplemented);
isDistinct(StarChunks, Chunk, _toBeImplemented);
includes(StarChunks, Chunk, _toBeImplemented);
includesStrictly(StarChunks, Chunk, _toBeImplemented);
isIncluded(StarChunks, Chunk, _toBeImplemented);
isIncludedStrictly(StarChunks, Chunk, _toBeImplemented);
overlaps(StarChunks, Chunk, _toBeImplemented);
overlapsStrictly(StarChunks, Chunk, _toBeImplemented);


// ***************************************************************************
// StarChunks/StarChunk API
// ***************************************************************************
add(StarChunks, StarChunk, _toBeImplemented);
remove(StarChunks, StarChunk, _toBeImplemented);
equals(StarChunks, StarChunk, _toBeImplemented);
isDistinct(StarChunks, StarChunk, _toBeImplemented);
includes(StarChunks, StarChunk, _toBeImplemented);
includesStrictly(StarChunks, StarChunk, _toBeImplemented);
isIncluded(StarChunks, StarChunk, _toBeImplemented);
isIncludedStrictly(StarChunks, StarChunk, _toBeImplemented);
overlaps(StarChunks, StarChunk, _toBeImplemented);
overlapsStrictly(StarChunks, StarChunk, _toBeImplemented);


// ***************************************************************************
// StarChunks/Star API
// ***************************************************************************
add(StarChunks, Star, _this);
remove(StarChunks, Star, _empty);
equals(StarChunks, Star, _toBeImplemented);
isDistinct(StarChunks, Star, _toBeImplemented);
includes(StarChunks, Star, _toBeImplemented);
includesStrictly(StarChunks, Star, _toBeImplemented);
isIncluded(StarChunks, Star, _toBeImplemented);
isIncludedStrictly(StarChunks, Star, _toBeImplemented);
overlaps(StarChunks, Star, _toBeImplemented);
overlapsStrictly(StarChunks, Star, _toBeImplemented);


// ***************************************************************************
// StarChunks/Empty API
// ***************************************************************************
add(StarChunks, Empty, _this);
remove(StarChunks, Empty, _this);
equals(StarChunks, Empty, _toBeImplemented);
isDistinct(StarChunks, Empty, _toBeImplemented);
includes(StarChunks, Empty, _toBeImplemented);
includesStrictly(StarChunks, Empty, _toBeImplemented);
isIncluded(StarChunks, Empty, _toBeImplemented);
isIncludedStrictly(StarChunks, Empty, _toBeImplemented);
overlaps(StarChunks, Empty, _toBeImplemented);
overlapsStrictly(StarChunks, Empty, _toBeImplemented);


// ***************************************************************************
// StarChunks/Chunks API
// ***************************************************************************
add(StarChunks, Chunks, _toBeImplemented);
remove(StarChunks, Chunks, _toBeImplemented);
equals(StarChunks, Chunks, _toBeImplemented);
isDistinct(StarChunks, Chunks, _toBeImplemented);
includes(StarChunks, Chunks, _toBeImplemented);
includesStrictly(StarChunks, Chunks, _toBeImplemented);
isIncluded(StarChunks, Chunks, _toBeImplemented);
isIncludedStrictly(StarChunks, Chunks, _toBeImplemented);
overlaps(StarChunks, Chunks, _toBeImplemented);
overlapsStrictly(StarChunks, Chunks, _toBeImplemented);


// ***************************************************************************
// StarChunks/StarChunks API
// ***************************************************************************
add(StarChunks, StarChunks, _toBeImplemented);
remove(StarChunks, StarChunks, _toBeImplemented);
equals(StarChunks, StarChunks, _toBeImplemented);
isDistinct(StarChunks, StarChunks, _toBeImplemented);
includes(StarChunks, StarChunks, _toBeImplemented);
includesStrictly(StarChunks, StarChunks, _toBeImplemented);
isIncluded(StarChunks, StarChunks, _toBeImplemented);
isIncludedStrictly(StarChunks, StarChunks, _toBeImplemented);
overlaps(StarChunks, StarChunks, _toBeImplemented);
overlapsStrictly(StarChunks, StarChunks, _toBeImplemented);


// ***************************************************************************
// StarChunks/MixedChunks API
// ***************************************************************************
add(StarChunks, MixedChunks, _toBeImplemented);
remove(StarChunks, MixedChunks, _toBeImplemented);
equals(StarChunks, MixedChunks, _toBeImplemented);
isDistinct(StarChunks, MixedChunks, _toBeImplemented);
includes(StarChunks, MixedChunks, _toBeImplemented);
includesStrictly(StarChunks, MixedChunks, _toBeImplemented);
isIncluded(StarChunks, MixedChunks, _toBeImplemented);
isIncludedStrictly(StarChunks, MixedChunks, _toBeImplemented);
overlaps(StarChunks, MixedChunks, _toBeImplemented);
overlapsStrictly(StarChunks, MixedChunks, _toBeImplemented);

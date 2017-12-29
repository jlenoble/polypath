/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _equals, _isIncluded, _newChunksRight,
  _newMixedChunksRight, _clearRight, _identity, _empty, _this, _antitestRight}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Chunk/Chunk API
// ***************************************************************************
add(Chunk, Chunk, _newChunksRight);
remove(Chunk, Chunk, _clearRight);
equals(Chunk, Chunk, _equals);
isDistinct(Chunk, Chunk, _antitestRight);
includes(Chunk, Chunk, _equals);
includesStrictly(Chunk, Chunk, _false);
isIncluded(Chunk, Chunk, _equals);
isIncludedStrictly(Chunk, Chunk, _false);
overlaps(Chunk, Chunk, _equals);
overlapsStrictly(Chunk, Chunk, _false);


// ***************************************************************************
// Chunk/StarChunk API
// ***************************************************************************
add(Chunk, StarChunk, _newMixedChunksRight);
remove(Chunk, StarChunk, _clearRight);
equals(Chunk, StarChunk, _false);
isDistinct(Chunk, StarChunk, _antitestRight);
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
add(Chunk, Chunks, _newChunksRight);
remove(Chunk, Chunks, _clearRight);
equals(Chunk, Chunks, _false);
isDistinct(Chunk, Chunks, _antitestRight);
includes(Chunk, Chunks, _false);
includesStrictly(Chunk, Chunks, _false);
isIncluded(Chunk, Chunks, _isIncluded);
isIncludedStrictly(Chunk, Chunks, _isIncluded);
overlaps(Chunk, Chunks, _isIncluded);
overlapsStrictly(Chunk, Chunks, _false);


// ***************************************************************************
// Chunk/StarChunks API
// ***************************************************************************
add(Chunk, StarChunks, _newMixedChunksRight);
remove(Chunk, StarChunks, _clearRight);
equals(Chunk, StarChunks, _false);
isDistinct(Chunk, StarChunks, _antitestRight);
includes(Chunk, StarChunks, _false);
includesStrictly(Chunk, StarChunks, _false);
isIncluded(Chunk, StarChunks, _isIncluded);
isIncludedStrictly(Chunk, StarChunks, _isIncluded);
overlaps(Chunk, StarChunks, _isIncluded);
overlapsStrictly(Chunk, StarChunks, _false);


// ***************************************************************************
// Chunk/MixedChunks API
// ***************************************************************************
add(Chunk, MixedChunks, _newMixedChunksRight);
remove(Chunk, MixedChunks, _clearRight);
equals(Chunk, MixedChunks, _false);
isDistinct(Chunk, MixedChunks, _antitestRight);
includes(Chunk, MixedChunks, _false);
includesStrictly(Chunk, MixedChunks, _false);
isIncluded(Chunk, MixedChunks, _isIncluded);
isIncludedStrictly(Chunk, MixedChunks, _isIncluded);
overlaps(Chunk, MixedChunks, _isIncluded);
overlapsStrictly(Chunk, MixedChunks, _false);

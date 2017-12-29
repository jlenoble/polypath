/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _identity, _true, _false, _equals, _testLeft, _multiTest,
  _isIncluded, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunks/Chunk API
// ***************************************************************************
add(StarChunks, Chunk, _toBeImplemented);
remove(StarChunks, Chunk, _toBeImplemented);
equals(StarChunks, Chunk, _false);
isDistinct(StarChunks, Chunk, _toBeImplemented);
includes(StarChunks, Chunk, _testLeft);
includesStrictly(StarChunks, Chunk, _toBeImplemented);
isIncluded(StarChunks, Chunk, _false);
isIncludedStrictly(StarChunks, Chunk, _toBeImplemented);
overlaps(StarChunks, Chunk, _toBeImplemented);
overlapsStrictly(StarChunks, Chunk, _toBeImplemented);


// ***************************************************************************
// StarChunks/StarChunk API
// ***************************************************************************
add(StarChunks, StarChunk, _toBeImplemented);
remove(StarChunks, StarChunk, _toBeImplemented);
equals(StarChunks, StarChunk, _false);
isDistinct(StarChunks, StarChunk, _toBeImplemented);
includes(StarChunks, StarChunk, _testLeft);
includesStrictly(StarChunks, StarChunk, _toBeImplemented);
isIncluded(StarChunks, StarChunk, _isIncluded);
isIncludedStrictly(StarChunks, StarChunk, _toBeImplemented);
overlaps(StarChunks, StarChunk, _toBeImplemented);
overlapsStrictly(StarChunks, StarChunk, _toBeImplemented);


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
equals(StarChunks, Empty, _false);
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
add(StarChunks, Chunks, _toBeImplemented);
remove(StarChunks, Chunks, _toBeImplemented);
equals(StarChunks, Chunks, _false);
isDistinct(StarChunks, Chunks, _toBeImplemented);
includes(StarChunks, Chunks, _multiTest);
includesStrictly(StarChunks, Chunks, _toBeImplemented);
isIncluded(StarChunks, Chunks, _false);
isIncludedStrictly(StarChunks, Chunks, _toBeImplemented);
overlaps(StarChunks, Chunks, _toBeImplemented);
overlapsStrictly(StarChunks, Chunks, _toBeImplemented);


// ***************************************************************************
// StarChunks/StarChunks API
// ***************************************************************************
add(StarChunks, StarChunks, _toBeImplemented);
remove(StarChunks, StarChunks, _toBeImplemented);
equals(StarChunks, StarChunks, _equals);
isDistinct(StarChunks, StarChunks, _toBeImplemented);
includes(StarChunks, StarChunks, _multiTest);
includesStrictly(StarChunks, StarChunks, _toBeImplemented);
isIncluded(StarChunks, StarChunks, _isIncluded);
isIncludedStrictly(StarChunks, StarChunks, _toBeImplemented);
overlaps(StarChunks, StarChunks, _toBeImplemented);
overlapsStrictly(StarChunks, StarChunks, _toBeImplemented);


// ***************************************************************************
// StarChunks/MixedChunks API
// ***************************************************************************
add(StarChunks, MixedChunks, _toBeImplemented);
remove(StarChunks, MixedChunks, _toBeImplemented);
equals(StarChunks, MixedChunks, _false);
isDistinct(StarChunks, MixedChunks, _toBeImplemented);
includes(StarChunks, MixedChunks, _multiTest);
includesStrictly(StarChunks, MixedChunks, _toBeImplemented);
isIncluded(StarChunks, MixedChunks, _isIncluded);
isIncludedStrictly(StarChunks, MixedChunks, _toBeImplemented);
overlaps(StarChunks, MixedChunks, _toBeImplemented);
overlapsStrictly(StarChunks, MixedChunks, _toBeImplemented);

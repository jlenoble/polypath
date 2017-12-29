/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_empty, _this, _false, _equals, _testLeft, _multiTest,
  _multiTestMixed, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// MixedChunks/Chunk API
// ***************************************************************************
add(MixedChunks, Chunk, _toBeImplemented);
remove(MixedChunks, Chunk, _toBeImplemented);
equals(MixedChunks, Chunk, _false);
isDistinct(MixedChunks, Chunk, _toBeImplemented);
includes(MixedChunks, Chunk, _testLeft);
includesStrictly(MixedChunks, Chunk, _toBeImplemented);
isIncluded(MixedChunks, Chunk, _toBeImplemented);
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
includes(MixedChunks, StarChunk, _testLeft);
includesStrictly(MixedChunks, StarChunk, _toBeImplemented);
isIncluded(MixedChunks, StarChunk, _toBeImplemented);
isIncludedStrictly(MixedChunks, StarChunk, _toBeImplemented);
overlaps(MixedChunks, StarChunk, _toBeImplemented);
overlapsStrictly(MixedChunks, StarChunk, _toBeImplemented);


// ***************************************************************************
// MixedChunks/Star API
// ***************************************************************************
add(MixedChunks, Star, _this);
remove(MixedChunks, Star, _empty);
equals(MixedChunks, Star, _false);
isDistinct(MixedChunks, Star, _toBeImplemented);
includes(MixedChunks, Star, _toBeImplemented);
includesStrictly(MixedChunks, Star, _toBeImplemented);
isIncluded(MixedChunks, Star, _toBeImplemented);
isIncludedStrictly(MixedChunks, Star, _toBeImplemented);
overlaps(MixedChunks, Star, _toBeImplemented);
overlapsStrictly(MixedChunks, Star, _toBeImplemented);


// ***************************************************************************
// MixedChunks/Empty API
// ***************************************************************************
add(MixedChunks, Empty, _this);
remove(MixedChunks, Empty, _this);
equals(MixedChunks, Empty, _false);
isDistinct(MixedChunks, Empty, _toBeImplemented);
includes(MixedChunks, Empty, _toBeImplemented);
includesStrictly(MixedChunks, Empty, _toBeImplemented);
isIncluded(MixedChunks, Empty, _toBeImplemented);
isIncludedStrictly(MixedChunks, Empty, _toBeImplemented);
overlaps(MixedChunks, Empty, _toBeImplemented);
overlapsStrictly(MixedChunks, Empty, _toBeImplemented);


// ***************************************************************************
// MixedChunks/Chunks API
// ***************************************************************************
add(MixedChunks, Chunks, _toBeImplemented);
remove(MixedChunks, Chunks, _toBeImplemented);
equals(MixedChunks, Chunks, _false);
isDistinct(MixedChunks, Chunks, _toBeImplemented);
includes(MixedChunks, Chunks, _multiTest);
includesStrictly(MixedChunks, Chunks, _toBeImplemented);
isIncluded(MixedChunks, Chunks, _toBeImplemented);
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
includes(MixedChunks, StarChunks, _multiTest);
includesStrictly(MixedChunks, StarChunks, _toBeImplemented);
isIncluded(MixedChunks, StarChunks, _toBeImplemented);
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
includes(MixedChunks, MixedChunks, _multiTestMixed);
includesStrictly(MixedChunks, MixedChunks, _toBeImplemented);
isIncluded(MixedChunks, MixedChunks, _toBeImplemented);
isIncludedStrictly(MixedChunks, MixedChunks, _toBeImplemented);
overlaps(MixedChunks, MixedChunks, _toBeImplemented);
overlapsStrictly(MixedChunks, MixedChunks, _toBeImplemented);

/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _identity, _empty, _this, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Star/Chunk API
// ***************************************************************************
add(Star, Chunk, _this);
remove(Star, Chunk, _toBeImplemented);
equals(Star, Chunk, _false);
isDistinct(Star, Chunk, _false);
includes(Star, Chunk, _true);
includesStrictly(Star, Chunk, _true);
isIncluded(Star, Chunk, _false);
isIncludedStrictly(Star, Chunk, _false);
overlaps(Star, Chunk, _true);
overlapsStrictly(Star, Chunk, _false);


// ***************************************************************************
// Star/StarChunk API
// ***************************************************************************
add(Star, StarChunk, _this);
remove(Star, StarChunk, _toBeImplemented);
equals(Star, StarChunk, _false);
isDistinct(Star, StarChunk, _false);
includes(Star, StarChunk, _true);
includesStrictly(Star, StarChunk, _true);
isIncluded(Star, StarChunk, _false);
isIncludedStrictly(Star, StarChunk, _false);
overlaps(Star, StarChunk, _true);
overlapsStrictly(Star, StarChunk, _false);


// ***************************************************************************
// Star/Star API
// ***************************************************************************
add(Star, Star, _this);
remove(Star, Star, _empty);
equals(Star, Star, _true);
isDistinct(Star, Star, _false);
includes(Star, Star, _true);
includesStrictly(Star, Star, _false);
isIncluded(Star, Star, _true);
isIncludedStrictly(Star, Star, _false);
overlaps(Star, Star, _true);
overlapsStrictly(Star, Star, _false);


// ***************************************************************************
// Star/Empty API
// ***************************************************************************
add(Star, Empty, _this);
remove(Star, Empty, _this);
equals(Star, Empty, _false);
isDistinct(Star, Empty, _false);
includes(Star, Empty, _true);
includesStrictly(Star, Empty, _true);
isIncluded(Star, Empty, _false);
isIncludedStrictly(Star, Empty, _false);
overlaps(Star, Empty, _true);
overlapsStrictly(Star, Empty, _false);


// ***************************************************************************
// Star/Chunks API
// ***************************************************************************
add(Star, Chunks, _identity);
remove(Star, Chunks, _toBeImplemented);
equals(Star, Chunks, _false);
isDistinct(Star, Chunks, _false);
includes(Star, Chunks, _true);
includesStrictly(Star, Chunks, _true);
isIncluded(Star, Chunks, _false);
isIncludedStrictly(Star, Chunks, _false);
overlaps(Star, Chunks, _true);
overlapsStrictly(Star, Chunks, _false);


// ***************************************************************************
// Star/StarChunks API
// ***************************************************************************
add(Star, StarChunks, _identity);
remove(Star, StarChunks, _toBeImplemented);
equals(Star, StarChunks, _false);
isDistinct(Star, StarChunks, _false);
includes(Star, StarChunks, _true);
includesStrictly(Star, StarChunks, _true);
isIncluded(Star, StarChunks, _false);
isIncludedStrictly(Star, StarChunks, _false);
overlaps(Star, StarChunks, _true);
overlapsStrictly(Star, StarChunks, _false);


// ***************************************************************************
// Star/MixedChunks API
// ***************************************************************************
add(Star, MixedChunks, _identity);
remove(Star, MixedChunks, _toBeImplemented);
equals(Star, MixedChunks, _false);
isDistinct(Star, MixedChunks, _false);
includes(Star, MixedChunks, _true);
includesStrictly(Star, MixedChunks, _true);
isIncluded(Star, MixedChunks, _false);
isIncludedStrictly(Star, MixedChunks, _false);
overlaps(Star, MixedChunks, _true);
overlapsStrictly(Star, MixedChunks, _false);

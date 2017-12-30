/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _identity, _empty} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Empty/Chunk API
// ***************************************************************************
add(Empty, Chunk, _identity);
remove(Empty, Chunk, _empty);
equals(Empty, Chunk, _false);
isDistinct(Empty, Chunk, _false);
includes(Empty, Chunk, _false);
includesStrictly(Empty, Chunk, _false);
isIncluded(Empty, Chunk, _true);
isIncludedStrictly(Empty, Chunk, _true);
overlaps(Empty, Chunk, _true);
overlapsStrictly(Empty, Chunk, _false);


// ***************************************************************************
// Empty/StarChunk API
// ***************************************************************************
add(Empty, StarChunk, _identity);
remove(Empty, StarChunk, _empty);
equals(Empty, StarChunk, _false);
isDistinct(Empty, StarChunk, _false);
includes(Empty, StarChunk, _false);
includesStrictly(Empty, StarChunk, _false);
isIncluded(Empty, StarChunk, _true);
isIncludedStrictly(Empty, StarChunk, _true);
overlaps(Empty, StarChunk, _true);
overlapsStrictly(Empty, StarChunk, _false);


// ***************************************************************************
// Empty/Star API
// ***************************************************************************
add(Empty, Star, _identity);
remove(Empty, Star, _empty);
equals(Empty, Star, _false);
isDistinct(Empty, Star, _false);
includes(Empty, Star, _false);
includesStrictly(Empty, Star, _false);
isIncluded(Empty, Star, _true);
isIncludedStrictly(Empty, Star, _true);
overlaps(Empty, Star, _true);
overlapsStrictly(Empty, Star, _false);


// ***************************************************************************
// Empty/Empty API
// ***************************************************************************
add(Empty, Empty, _empty);
remove(Empty, Empty, _empty);
equals(Empty, Empty, _true);
isDistinct(Empty, Empty, _false);
includes(Empty, Empty, _true);
includesStrictly(Empty, Empty, _false);
isIncluded(Empty, Empty, _true);
isIncludedStrictly(Empty, Empty, _false);
overlaps(Empty, Empty, _true);
overlapsStrictly(Empty, Empty, _false);


// ***************************************************************************
// Empty/Chunks API
// ***************************************************************************
add(Empty, Chunks, _identity);
remove(Empty, Chunks, _empty);
equals(Empty, Chunks, _false);
isDistinct(Empty, Chunks, _false);
includes(Empty, Chunks, _false);
includesStrictly(Empty, Chunks, _false);
isIncluded(Empty, Chunks, _true);
isIncludedStrictly(Empty, Chunks, _true);
overlaps(Empty, Chunks, _true);
overlapsStrictly(Empty, Chunks, _false);


// ***************************************************************************
// Empty/StarChunks API
// ***************************************************************************
add(Empty, StarChunks, _identity);
remove(Empty, StarChunks, _empty);
equals(Empty, StarChunks, _false);
isDistinct(Empty, StarChunks, _false);
includes(Empty, StarChunks, _false);
includesStrictly(Empty, StarChunks, _false);
isIncluded(Empty, StarChunks, _true);
isIncludedStrictly(Empty, StarChunks, _true);
overlaps(Empty, StarChunks, _true);
overlapsStrictly(Empty, StarChunks, _false);


// ***************************************************************************
// Empty/MixedChunks API
// ***************************************************************************
add(Empty, MixedChunks, _identity);
remove(Empty, MixedChunks, _empty);
equals(Empty, MixedChunks, _false);
isDistinct(Empty, MixedChunks, _false);
includes(Empty, MixedChunks, _false);
includesStrictly(Empty, MixedChunks, _false);
isIncluded(Empty, MixedChunks, _true);
isIncludedStrictly(Empty, MixedChunks, _true);
overlaps(Empty, MixedChunks, _true);
overlapsStrictly(Empty, MixedChunks, _false);

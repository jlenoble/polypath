/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes,
  overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _empty, _this, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Star/Star API
// ***************************************************************************
add(Star, Star, _this);
remove(Star, Star, _empty);
equals(Star, Star, _true);
isDistinct(Star, Star, _false);
includes(Star, Star, _true);
overlaps(Star, Star, _true);
overlapsStrictly(Star, Star, _false);


// ***************************************************************************
// Star/any type APIs
// ***************************************************************************
[Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(
  Type => {
    add(Star, Type, _this);
    equals(Star, Type, _false);
    isDistinct(Star, Type, _false);
    includes(Star, Type, _true);
    overlaps(Star, Type, _true);
    overlapsStrictly(Star, Type, _false);

    // Reciprocal
    includes(Type, Star, _false);
  });


// ***************************************************************************
// Star/Chunk API
// ***************************************************************************
remove(Star, Chunk, _toBeImplemented);

// ***************************************************************************
// Star/StarChunk API
// ***************************************************************************
remove(Star, StarChunk, _toBeImplemented);

// ***************************************************************************
// Star/Empty API
// ***************************************************************************
remove(Star, Empty, _this);
includes(Star, Empty, _true);

// ***************************************************************************
// Star/Chunks API
// ***************************************************************************
remove(Star, Chunks, _toBeImplemented);

// ***************************************************************************
// Star/StarChunks API
// ***************************************************************************
remove(Star, StarChunks, _toBeImplemented);

// ***************************************************************************
// Star/MixedChunks API
// ***************************************************************************
remove(Star, MixedChunks, _toBeImplemented);

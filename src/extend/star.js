/* eslint-disable no-invalid-this */
import {add, remove, equals, includes, overlaps} from '../methods';

import {_true, _sameTrue, _false, _empty, _this, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Star} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Star/Star API
// ***************************************************************************
add(Star, Star, _this);
remove(Star, Star, _empty);
equals(Star, Star, _true);
includes(Star, Star, _sameTrue);
overlaps(Star, Star, _true);


// ***************************************************************************
// Star/any type APIs
// ***************************************************************************
[Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(
  Type => {
    add(Star, Type, _this);
    equals(Star, Type, _false);
    includes(Star, Type, _true);
    overlaps(Star, Type, _true);

    // Reciprocal
    remove(Type, Star, _empty);
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

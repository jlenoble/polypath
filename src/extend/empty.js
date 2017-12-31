/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes,
  overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _identity, _empty} from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Empty/Empty API
// ***************************************************************************
add(Empty, Empty, _empty);
remove(Empty, Empty, _empty);
equals(Empty, Empty, _true);
isDistinct(Empty, Empty, _false);
includes(Empty, Empty, _true);
overlaps(Empty, Empty, _true);
overlapsStrictly(Empty, Empty, _false);


// ***************************************************************************
// Empty/any type APIs
// ***************************************************************************
[Chunk, StarChunk, Star, Chunks, StarChunks, MixedChunks].forEach(
  Type => {
    add(Empty, Type, _identity);
    remove(Empty, Type, _empty);
    equals(Empty, Type, _false);
    isDistinct(Empty, Type, _false);
    includes(Empty, Type, _false);
    overlaps(Empty, Type, _true);
    overlapsStrictly(Empty, Type, _false);

    // Reciprocal
    includes(Type, Empty, _true);
  });

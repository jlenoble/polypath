/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

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
includesStrictly(Empty, Empty, _false);
isIncluded(Empty, Empty, _true);
isIncludedStrictly(Empty, Empty, _false);
overlaps(Empty, Empty, _true);
overlapsStrictly(Empty, Empty, _false);


// ***************************************************************************
// Empty/any type APIs
// ***************************************************************************
[Chunk, StarChunk, Star, Chunks, StarChunks, MixedChunks].forEach(
  Type => {
    add(Empty, Type, _identity);
    remove(Empty, Type, _empty);
    equals(Empty, Type, _false, {commutative: true});
    isDistinct(Empty, Type, _false, {commutative: true});
    includes(Empty, Type, _false);
    includesStrictly(Empty, Type, _false);
    isIncluded(Empty, Type, _true);
    isIncludedStrictly(Empty, Type, _true);
    overlaps(Empty, Type, _true);
    overlapsStrictly(Empty, Type, _false);
  });

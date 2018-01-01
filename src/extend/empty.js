/* eslint-disable no-invalid-this */
import {add, remove, equals, includes, overlaps} from '../methods';

import {_true, _sameTrue, _false, _this, _identity, _empty}
  from '../implementations';

import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Empty/Empty API
// ***************************************************************************
add(Empty, Empty, _empty);
remove(Empty, Empty, _empty);
equals(Empty, Empty, _true);
includes(Empty, Empty, _sameTrue);
overlaps(Empty, Empty, _true);


// ***************************************************************************
// Empty/any type APIs
// ***************************************************************************
[Chunk, StarChunk, Star, Chunks, StarChunks, MixedChunks].forEach(
  Type => {
    add(Empty, Type, _identity);
    remove(Empty, Type, _empty);
    equals(Empty, Type, _false);
    includes(Empty, Type, _false);
    overlaps(Empty, Type, _true);

    // Reciprocal
    includes(Type, Empty, _true);
    remove(Type, Empty, _this);
  });

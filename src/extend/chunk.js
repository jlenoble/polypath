/* eslint-disable no-invalid-this */
import {add, remove, equals, includes, overlaps} from '../methods';

import {_false, _equals, _maybeClearChunk}
  from '../implementations';

import Chunk, {StarChunk} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Chunk/Chunk API
// ***************************************************************************
add(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk ? this : new Chunks(
    this.chunk + ',' + obj.chunk);
});
remove(Chunk, Chunk, _maybeClearChunk);
equals(Chunk, Chunk, _equals);
includes(Chunk, Chunk, _equals);
overlaps(Chunk, Chunk, _equals);

// ***************************************************************************
// Chunk/any type APIs
// ***************************************************************************
[StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  remove(Chunk, Type, _maybeClearChunk);
  includes(Chunk, Type, _false);
});

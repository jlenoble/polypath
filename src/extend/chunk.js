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
// Chunk/StarChunk API
// ***************************************************************************
remove(Chunk, StarChunk, _maybeClearChunk);
includes(Chunk, StarChunk, _false);


// ***************************************************************************
// Chunk/Chunks API
// ***************************************************************************
remove(Chunk, Chunks, _maybeClearChunk);
includes(Chunk, Chunks, _false);


// ***************************************************************************
// Chunk/StarChunks API
// ***************************************************************************
remove(Chunk, StarChunks, _maybeClearChunk);
includes(Chunk, StarChunks, _false);


// ***************************************************************************
// Chunk/MixedChunks API
// ***************************************************************************
remove(Chunk, MixedChunks, _maybeClearChunk);
includes(Chunk, MixedChunks, _false);

/* eslint-disable no-invalid-this */
import {add, remove, equals, includes, overlaps} from '../methods';

import {_false, _equals, _includes, _includesAll, _includesSome,
  _overlaps, _overlapsSingle, _addMixed, _addReduce, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// StarChunks/Chunk API
// ***************************************************************************
add(StarChunks, Chunk, _addMixed);
remove(StarChunks, Chunk, _toBeImplemented);
equals(StarChunks, Chunk, _false);
includes(StarChunks, Chunk, _includes);
overlaps(StarChunks, Chunk, _includes);


// ***************************************************************************
// StarChunks/StarChunk API
// ***************************************************************************
add(StarChunks, StarChunk, function (obj) {
  if (this.includes(obj)) {
    return this;
  }
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  return chunks.length ? new StarChunks(chunks.map(chunk => chunk.chunk)
    .concat(obj.chunk).join(',')) : obj;
});
remove(StarChunks, StarChunk, _toBeImplemented);
equals(StarChunks, StarChunk, _false);
includes(StarChunks, StarChunk, _includes);
overlaps(StarChunks, StarChunk, _overlapsSingle);


// ***************************************************************************
// StarChunks/Chunks API
// ***************************************************************************
add(StarChunks, Chunks, _addReduce);
remove(StarChunks, Chunks, _toBeImplemented);
equals(StarChunks, Chunks, _false);
includes(StarChunks, Chunks, _includesAll);
overlaps(StarChunks, Chunks, _includesSome);


// ***************************************************************************
// StarChunks/StarChunks API
// ***************************************************************************
add(StarChunks, StarChunks, _addReduce);
remove(StarChunks, StarChunks, _toBeImplemented);
equals(StarChunks, StarChunks, _equals);
includes(StarChunks, StarChunks, _includesAll);
overlaps(StarChunks, StarChunks, _overlaps);


// ***************************************************************************
// StarChunks/MixedChunks API
// ***************************************************************************
remove(StarChunks, MixedChunks, _toBeImplemented);
includes(StarChunks, MixedChunks, _includesAll);

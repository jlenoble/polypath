/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, overlaps} from '../methods';

import {_false, _equals, _isDistinct,
  _includes, _includesAll, _includesSome, _includesNot, _overlapsSingle,
  _filterChunks} from '../implementations';

import Chunk, {StarChunk} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// Chunks/Chunk API
// ***************************************************************************
add(Chunks, Chunk, function (obj) {
  return this.includes(obj) ? this : new Chunks(this.chunk + ',' + obj.chunk);
});
remove(Chunks, Chunk, _filterChunks);
equals(Chunks, Chunk, _false);
isDistinct(Chunks, Chunk, _includesNot);
includes(Chunks, Chunk, _includes);
overlaps(Chunks, Chunk, _includes);


// ***************************************************************************
// Chunks/StarChunk API
// ***************************************************************************
add(Chunks, StarChunk, function (obj) {
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  return new MixedChunks(chunks.map(chunk => chunk.chunk).join(',') + ',' +
    obj.chunk);
});
remove(Chunks, StarChunk, _filterChunks);
equals(Chunks, StarChunk, _false);
isDistinct(Chunks, StarChunk, _isDistinct);
includes(Chunks, StarChunk, _false);
overlaps(Chunks, StarChunk, _overlapsSingle);


// ***************************************************************************
// Chunks/Chunks API
// ***************************************************************************
add(Chunks, Chunks, function (obj) {
  return new Chunks(this.chunk + ',' + obj.chunk);
});
remove(Chunks, Chunks, _filterChunks);
equals(Chunks, Chunks, _equals);
isDistinct(Chunks, Chunks, _isDistinct);
includes(Chunks, Chunks, _includesAll);
overlaps(Chunks, Chunks, _includesSome);


// ***************************************************************************
// Chunks/StarChunks API
// ***************************************************************************
remove(Chunks, StarChunks, _filterChunks);
includes(Chunks, StarChunks, _false);


// ***************************************************************************
// Chunks/MixedChunks API
// ***************************************************************************
remove(Chunks, MixedChunks, _filterChunks);
includes(Chunks, MixedChunks, _false);

/* eslint-disable no-invalid-this */
import {add, remove, equals, includes, overlaps} from '../methods';

import {_false, _equals, _includes, _includesAll, _includesSome,
  _overlaps, _overlapsSingle, _addMixed, _addReduce, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// MixedChunks/Chunk API
// ***************************************************************************
add(MixedChunks, Chunk, _addMixed);
remove(MixedChunks, Chunk, _toBeImplemented);
equals(MixedChunks, Chunk, _false);
includes(MixedChunks, Chunk, _includes);
overlaps(MixedChunks, Chunk, _includes);


// ***************************************************************************
// MixedChunks/StarChunk API
// ***************************************************************************
add(MixedChunks, StarChunk, function (obj) {
  if (this.includes(obj)) {
    return this;
  }
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  if (!chunks.length) {
    return obj;
  }
  const _chunks = chunks.map(chunk => chunk.chunk).concat(obj.chunk).join(',');
  return chunks.filter(chunk => !chunk.regex).length ?
    new MixedChunks(_chunks) : new StarChunks(_chunks);
});
remove(MixedChunks, StarChunk, _toBeImplemented);
equals(MixedChunks, StarChunk, _false);
includes(MixedChunks, StarChunk, _includes);
overlaps(MixedChunks, StarChunk, _overlapsSingle);


// ***************************************************************************
// MixedChunks/Chunks API
// ***************************************************************************
add(MixedChunks, Chunks, _addReduce);
remove(MixedChunks, Chunks, _toBeImplemented);
equals(MixedChunks, Chunks, _false);
includes(MixedChunks, Chunks, _includesAll);
overlaps(MixedChunks, Chunks, _includesSome);


// ***************************************************************************
// MixedChunks/StarChunks API
// ***************************************************************************
add(MixedChunks, StarChunks, _addReduce);
remove(MixedChunks, StarChunks, _toBeImplemented);
equals(MixedChunks, StarChunks, _false);
includes(MixedChunks, StarChunks, _includesAll);
overlaps(MixedChunks, StarChunks, _overlaps);


// ***************************************************************************
// MixedChunks/MixedChunks API
// ***************************************************************************
add(MixedChunks, MixedChunks, _addReduce);
remove(MixedChunks, MixedChunks, _toBeImplemented);
equals(MixedChunks, MixedChunks, _equals);
includes(MixedChunks, MixedChunks, _includesAll);
overlaps(MixedChunks, MixedChunks, _overlaps);

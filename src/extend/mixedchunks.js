/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes,
  overlaps, overlapsStrictly} from '../methods';

import {_this, _false, _equals, _isDistinct,
  _includes, _includesAll, _includesSome, _includesNot,
  _overlaps, _overlapsStrictly,
  _overlapsSingle, _addMixed, _addReduce, _toBeImplemented}
  from '../implementations';

import Chunk, {StarChunk, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';


// ***************************************************************************
// MixedChunks/Chunk API
// ***************************************************************************
add(MixedChunks, Chunk, _addMixed);
remove(MixedChunks, Chunk, _toBeImplemented);
equals(MixedChunks, Chunk, _false);
isDistinct(MixedChunks, Chunk, _includesNot);
includes(MixedChunks, Chunk, _includes);
overlaps(MixedChunks, Chunk, _includes);
overlapsStrictly(MixedChunks, Chunk, _false);


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
isDistinct(MixedChunks, StarChunk, _isDistinct);
includes(MixedChunks, StarChunk, _includes);
overlaps(MixedChunks, StarChunk, _overlapsSingle);
overlapsStrictly(MixedChunks, StarChunk, _overlapsStrictly);


// ***************************************************************************
// MixedChunks/Empty API
// ***************************************************************************
remove(MixedChunks, Empty, _this);


// ***************************************************************************
// MixedChunks/Chunks API
// ***************************************************************************
add(MixedChunks, Chunks, _addReduce);
remove(MixedChunks, Chunks, _toBeImplemented);
equals(MixedChunks, Chunks, _false);
isDistinct(MixedChunks, Chunks, _isDistinct);
includes(MixedChunks, Chunks, _includesAll);
overlaps(MixedChunks, Chunks, _includesSome);
overlapsStrictly(MixedChunks, Chunks, _overlapsStrictly);


// ***************************************************************************
// MixedChunks/StarChunks API
// ***************************************************************************
add(MixedChunks, StarChunks, _addReduce);
remove(MixedChunks, StarChunks, _toBeImplemented);
equals(MixedChunks, StarChunks, _false);
isDistinct(MixedChunks, StarChunks, _isDistinct);
includes(MixedChunks, StarChunks, _includesAll);
overlaps(MixedChunks, StarChunks, _overlaps);
overlapsStrictly(MixedChunks, StarChunks, _overlapsStrictly);


// ***************************************************************************
// MixedChunks/MixedChunks API
// ***************************************************************************
add(MixedChunks, MixedChunks, _addReduce);
remove(MixedChunks, MixedChunks, _toBeImplemented);
equals(MixedChunks, MixedChunks, _equals);
isDistinct(MixedChunks, MixedChunks, _isDistinct);
includes(MixedChunks, MixedChunks, _includesAll);
overlaps(MixedChunks, MixedChunks, _overlaps);
overlapsStrictly(MixedChunks, MixedChunks, _overlapsStrictly);

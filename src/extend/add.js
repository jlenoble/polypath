/* eslint-disable no-invalid-this */
import {add} from '../methods';
import Chunk, {StarChunk, Empty, Star} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';
import AntiChunk, {AntiStarChunk, AntiStar} from '../antichunk';
import {_this, _addMixed, _addReduce, _toBeImplemented}
  from '../implementations';


// ***************************************************************************
// Empty
// ***************************************************************************
[Empty, Chunk, StarChunk, Star, Chunks, StarChunks, MixedChunks].forEach(
  Type => {
    add(_this, Type, Empty);
  });


// ***************************************************************************
// Star
// ***************************************************************************
[Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  add(_this, Star, Type);
});


// ***************************************************************************
// Chunk
// ***************************************************************************
add(function (obj) {
  return this.chunk === obj.chunk ? this : new Chunks(
    this.chunk + ',' + obj.chunk);
}, Chunk);


// ***************************************************************************
// StarChunk
// ***************************************************************************
add(function (obj) {
  return this.includes(obj) ? this : obj.includes(this) ? obj :
    new StarChunks(this.chunk + ',' + obj.chunk);
}, StarChunk);

add(_addMixed, StarChunk, Chunk);


// ***************************************************************************
// Chunks
// ***************************************************************************
add(function (obj) {
  return new Chunks(this.chunk + ',' + obj.chunk);
}, Chunks);

add(function (obj) {
  return this.includes(obj) ? this : new Chunks(this.chunk + ',' + obj.chunk);
}, Chunks, Chunk);

add(function (obj) {
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  return new MixedChunks(chunks.map(chunk => chunk.chunk).join(',') + ',' +
    obj.chunk);
}, Chunks, StarChunk);


// ***************************************************************************
// StarChunks
// ***************************************************************************
add(_addReduce, StarChunks);

add(_addMixed, StarChunks, Chunk);

add(function (obj) {
  if (this.includes(obj)) {
    return this;
  }
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  return chunks.length ? new StarChunks(chunks.map(chunk => chunk.chunk)
    .concat(obj.chunk).join(',')) : obj;
}, StarChunks, StarChunk);

add(_addMixed, StarChunks, Chunks);


// ***************************************************************************
// MixedChunks
// ***************************************************************************
add(_addMixed, MixedChunks, Chunk);

add(function (obj) {
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
}, MixedChunks, StarChunk);

[Chunks, StarChunks, MixedChunks].forEach(Type => {
  add(_addReduce, MixedChunks, Type);
});


// ***************************************************************************
// AntiChunk
// ***************************************************************************
add(_toBeImplemented, AntiChunk);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks,
  AntiStarChunk, AntiStar].forEach(Type => {
  add(_toBeImplemented, Type, AntiChunk);
});


// ***************************************************************************
// AntiStarChunk
// ***************************************************************************
add(_toBeImplemented, AntiStarChunk);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks,
  MixedChunks, AntiStar].forEach(Type => {
  add(_toBeImplemented, Type, AntiStarChunk);
});


// ***************************************************************************
// AntiStar
// ***************************************************************************
add(_toBeImplemented, AntiStar);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks,
  MixedChunks].forEach(Type => {
  add(_toBeImplemented, Type, AntiStar);
});

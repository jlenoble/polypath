/* eslint-disable no-invalid-this */
import {remove} from '../methods';
import Chunk, {StarChunk, Empty, Star} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';
import {_this, _empty} from '../implementations';


// ***************************************************************************
// Empty
// ***************************************************************************
remove(_this, Empty);

[Chunk, StarChunk, Star, Chunks, StarChunks, MixedChunks].forEach(
  Type => {
    remove(_empty, Empty, Type);
    remove(_this, Type, Empty);
  });


// ***************************************************************************
// Star
// ***************************************************************************
remove(_empty, Star);

[Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  remove(_empty, Type, Star);
});


// ***************************************************************************
// Chunk
// ***************************************************************************
remove(function (obj) {
  return this.chunk === obj.chunk ? new Empty() : this;
}, Chunk);

[StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  remove(function (obj) {
    return obj.includes(this) ? new Empty() : this;
  }, Chunk, Type);
});

remove(function (obj) {
  const chunks = this.chunks.filter(chunk => obj.chunk !== this.chunk);

  if (chunks.length === this.chunks.length) {
    return this;
  } else if (chunks.length === 1) {
    return chunks[0];
  } else if (chunks.length === 0) {
    return new Empty();
  } else {
    return new Chunks(chunks.map(chunk => chunk.chunk).join(','));
  }
}, Chunks, Chunk);


// ***************************************************************************
// StarChunk
// ***************************************************************************


// ***************************************************************************
// Chunks
// ***************************************************************************
[Chunks, StarChunks, MixedChunks].forEach(Type => {
  remove(function (obj) {
    const chunks = this.chunks.filter(chunk => !obj.includes(chunk));

    if (chunks.length === this.chunks.length) {
      return this;
    } else if (chunks.length === 1) {
      return chunks[0];
    } else if (chunks.length === 0) {
      return new Empty();
    } else {
      return new Chunks(chunks.map(chunk => chunk.chunk).join(','));
    }
  }, Chunks, Type);
});


// ***************************************************************************
// StarChunks
// ***************************************************************************


// ***************************************************************************
// MixedChunks
// ***************************************************************************

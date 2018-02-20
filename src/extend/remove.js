/* eslint-disable no-invalid-this */
import {remove} from '../methods';
import Chunk, {StarChunk, Empty, Star} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';
import {FilteredChunks} from '../factory';
import {_this, _empty, _toBeImplemented} from '../implementations';


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
  remove(_toBeImplemented, Star, Type);
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
  const chunks = this.chunks.filter(chunk => obj.chunk !== chunk.chunk);

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

[StarChunk, StarChunks, MixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, Chunk);
});


// ***************************************************************************
// StarChunk
// ***************************************************************************
remove(_toBeImplemented, StarChunk);
remove(_toBeImplemented, StarChunk, Chunks);
// Chunks/StarChunk: see Chunks below

[StarChunks, MixedChunks].forEach(Type => {
  remove(_toBeImplemented, StarChunk, Type);
  remove(_toBeImplemented, Type, StarChunk);
});

// ***************************************************************************
// Chunks
// ***************************************************************************
[StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
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

[StarChunks, MixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, Chunks);
});


// ***************************************************************************
// StarChunks
// ***************************************************************************
remove(_toBeImplemented, StarChunks);
remove(_toBeImplemented, StarChunks, MixedChunks);
remove(_toBeImplemented, MixedChunks, StarChunks);


// ***************************************************************************
// MixedChunks
// ***************************************************************************
remove(_toBeImplemented, MixedChunks);


// ***************************************************************************
// FilteredChunks
// ***************************************************************************
remove(_toBeImplemented, FilteredChunks);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks,
  MixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, FilteredChunks);
  remove(_toBeImplemented, FilteredChunks, Type);
});

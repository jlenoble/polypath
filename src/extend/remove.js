/* eslint-disable no-invalid-this */
import {remove} from '../methods';
import Chunk, {StarChunk, Empty, Star} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';
import AntiChunk, {AntiStarChunk, AntiStar} from '../antichunk';
import AntiChunks, {AntiStarChunks, AntiMixedChunks} from '../antichunks';
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
// AntiChunk
// ***************************************************************************
remove(_toBeImplemented, AntiChunk);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks, AntiStarChunk,
  AntiStar, AntiChunks, AntiStarChunks, AntiMixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, AntiChunk);
  remove(_toBeImplemented, AntiChunk, Type);
});


// ***************************************************************************
// AntiStarChunk
// ***************************************************************************
remove(_toBeImplemented, AntiStarChunk);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks, AntiStar,
  AntiChunks, AntiStarChunks, AntiMixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, AntiStarChunk);
  remove(_toBeImplemented, AntiStarChunk, Type);
});


// ***************************************************************************
// AntiStar
// ***************************************************************************
remove(_toBeImplemented, AntiStar);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks, AntiChunks,
  AntiStarChunks, AntiMixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, AntiStar);
  remove(_toBeImplemented, AntiStar, Type);
});


// ***************************************************************************
// AntiChunks
// ***************************************************************************
remove(_toBeImplemented, AntiChunks);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks, AntiStarChunks,
  AntiMixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, AntiChunks);
  remove(_toBeImplemented, AntiChunks, Type);
});


// ***************************************************************************
// AntiStarChunks
// ***************************************************************************
remove(_toBeImplemented, AntiStarChunks);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks,
  AntiMixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, AntiStarChunks);
  remove(_toBeImplemented, AntiStarChunks, Type);
});


// ***************************************************************************
// AntiMixedChunks
// ***************************************************************************
remove(_toBeImplemented, AntiMixedChunks);

[Empty, Star, Chunk, StarChunk, Chunks, StarChunks,
  MixedChunks].forEach(Type => {
  remove(_toBeImplemented, Type, AntiMixedChunks);
  remove(_toBeImplemented, AntiMixedChunks, Type);
});

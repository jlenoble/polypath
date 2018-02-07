/* eslint-disable no-invalid-this */
import {overlaps} from '../methods';
import Chunk, {StarChunk, Empty, Star} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';
import AntiChunk from '../antichunk';
import {succeed, fail} from 'typed-method';
import {_equals, _includes, _includesSome, _overlaps, _overlapsSingle}
  from '../implementations';


// ***************************************************************************
// Empty
// ***************************************************************************
[Empty, Chunk, StarChunk, Star, Chunks, StarChunks, MixedChunks,
  AntiChunk].forEach(
  Type => {
    overlaps(succeed, Type, Empty);
  });


// ***************************************************************************
// Star
// ***************************************************************************
[Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  overlaps(succeed, Type, Star);
});


// ***************************************************************************
// Chunk
// ***************************************************************************
overlaps(_equals, Chunk);

[StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  overlaps(_includes, Type, Chunk);
});

// ***************************************************************************
// StarChunk
// ***************************************************************************
overlaps(function (obj) {
  const chunks1 = this.chunk.split('*');
  const chunks2 = obj.chunk.split('*');

  const a1 = chunks1[0];
  const b1 = chunks1[chunks1.length - 1];
  const a2 = chunks2[0];
  const b2 = chunks2[chunks2.length - 1];

  if (!a1.includes(a2)) {
    if (!a2.includes(a1) || a2.substring(0, a1.length) !== a1) {
      return false;
    }
  } else {
    if (a1.substring(0, a2.length) !== a2) {
      return false;
    }
  }

  if (!b1.includes(b2)) {
    if (!b2.includes(b1)) {
      return false;
    }

    return b2.substring(b2.length - b1.length) === b1;
  }

  return b1.substring(b1.length - b2.length) === b2;
}, StarChunk);

[Chunks, StarChunks, MixedChunks].forEach(Type => {
  overlaps(_overlapsSingle, Type, StarChunk);
});


// ***************************************************************************
// Chunks
// ***************************************************************************
[Chunks, StarChunks, MixedChunks].forEach(Type => {
  overlaps(_includesSome, Type, Chunks);
});


// ***************************************************************************
// StarChunks
// ***************************************************************************
[StarChunks, MixedChunks].forEach(Type => {
  overlaps(_overlaps, Type, StarChunks);
});


// ***************************************************************************
// MixedChunks
// ***************************************************************************
overlaps(_overlaps, MixedChunks);


// ***************************************************************************
// AntiChunk
// ***************************************************************************
overlaps(_equals, AntiChunk);

[Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  overlaps(fail, Type, AntiChunk);
});

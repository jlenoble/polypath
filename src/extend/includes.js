/* eslint-disable no-invalid-this */
import {includes} from '../methods';
import Chunk, {StarChunk, Empty, Star} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';
import AntiChunk, {AntiStarChunk, AntiStar} from '../antichunk';
import AntiChunks, {AntiStarChunks, AntiMixedChunks} from '../antichunks';
import {FilteredChunks} from '../factory';
import {succeed, fail} from 'typed-method';
import {_equals, _includes, _includesAll, _toBeImplemented}
  from '../implementations';


// ***************************************************************************
// Empty
// ***************************************************************************
includes(succeed, Empty);

[Chunk, StarChunk, Star, Chunks, StarChunks, MixedChunks,
  AntiChunk, AntiStarChunk, AntiStar, AntiChunks, AntiStarChunks,
  AntiMixedChunks, FilteredChunks].forEach(Type => {
  includes(fail, Empty, Type);
  includes(succeed, Type, Empty);
});


// ***************************************************************************
// Star
// ***************************************************************************
includes(succeed, Star);

[Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  includes(succeed, Star, Type);
  includes(fail, Type, Star);
});


// ***************************************************************************
// Chunk
// ***************************************************************************
includes(_equals, Chunk);

[StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  includes(fail, Chunk, Type);
});


// ***************************************************************************
// StarChunk
// ***************************************************************************
includes(_includes, StarChunk, Chunk);

[Chunks, StarChunks, MixedChunks].forEach(Type => {
  includes(_includesAll, StarChunk, Type);
});

includes(function (obj) {
  const chunks1 = this.chunk.split('*');
  const chunks2 = obj.chunk.split('*');

  const iA1 = chunks1[Symbol.iterator]();
  const iA2 = chunks2[Symbol.iterator]();

  let a1 = iA1.next();
  let a2 = iA2.next();
  let b1;
  let b2;

  if (a1.value === '') {
    a1 = iA1.next();

    if (a2.value === '') {
      a2 = iA2.next();
    }
  } else {
    if (!a2.value.includes(a1.value)) {
      return false;
    }

    if (a2.value.substring(0, a1.value.length) !== a1.value) {
      return false;
    }
  }

  while (!a1.done && !a2.done) {
    if (!a2.value.includes(a1.value)) {
      return false;
    }

    b1 = a1;
    a1 = iA1.next();

    do {
      b2 = a2;
      a2 = iA2.next();
    } while (!a2.done && !a2.value.includes(a1.value));
  }

  if (!a1.done) {
    if (b2.value === '') {
      return a1.value === '';
    }

    if (a1.value !== '') {
      return b2.value.includes(a1.value);
    }
  }

  if (b2.value === '') {
    return b1.value === '';
  }

  if (!b2.value.includes(b1.value)) {
    return false;
  }

  return b2.value.substring(b2.value.length - b1.value.length) === b1.value;
}, StarChunk);


// ***************************************************************************
// Chunks
// ***************************************************************************
includes(_includesAll, Chunks);
includes(_includes, Chunks, Chunk);

[StarChunk, StarChunks, MixedChunks].forEach(Type => {
  includes(fail, Chunks, Type);
});


// ***************************************************************************
// StarChunks
// ***************************************************************************
[Chunk, StarChunk].forEach(Type => {
  includes(_includes, StarChunks, Type);
});

[Chunks, StarChunks, MixedChunks].forEach(Type => {
  includes(_includesAll, StarChunks, Type);
});


// ***************************************************************************
// MixedChunks
// ***************************************************************************
[Chunk, StarChunk].forEach(Type => {
  includes(_includes, MixedChunks, Type);
});

[Chunks, StarChunks, MixedChunks].forEach(Type => {
  includes(_includesAll, MixedChunks, Type);
});


// ***************************************************************************
// AntiStar
// ***************************************************************************
includes(succeed, AntiStar);

[Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
  includes(fail, AntiStar, Type);
  includes(fail, Type, AntiStar);
});

[AntiChunk, AntiStarChunk, AntiChunks, AntiStarChunks,
  AntiMixedChunks].forEach(Type => {
  includes(succeed, AntiStar, Type);
  includes(fail, Type, AntiStar);
});


// ***************************************************************************
// AntiClasses
// ***************************************************************************
[AntiChunk, AntiStarChunk, AntiChunks, AntiStarChunks,
  AntiMixedChunks].forEach(AntiType => {
  [Star, Chunk, StarChunk, Chunks, StarChunks, MixedChunks].forEach(Type => {
    includes(fail, AntiType, Type);
    includes(fail, Type, AntiType);
  });

  [AntiChunk, AntiStarChunk, AntiChunks, AntiStarChunks,
    AntiMixedChunks].forEach(AntiType2 => {
    includes(function (obj) {
      return this._chunk.includes(obj._chunk);
    }, AntiType, AntiType2);
  });
});


// ***************************************************************************
// FilteredChunks
// ***************************************************************************
includes(_toBeImplemented, FilteredChunks);

[Chunk, StarChunk, Star, Chunks, StarChunks, MixedChunks,
  AntiChunk, AntiStarChunk, AntiStar, AntiChunks, AntiStarChunks,
  AntiMixedChunks].forEach(Type => {
  includes(_toBeImplemented, FilteredChunks, Type);
  includes(_toBeImplemented, Type, FilteredChunks);
});

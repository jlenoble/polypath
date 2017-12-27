/* eslint-disable no-invalid-this */
import {add} from '../methods';
import Chunk, {StarChunk} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';

add(Chunk, Chunk, function (obj) {
  return this.test(obj) ? obj : new Chunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, StarChunk, function (obj) {
  return this.test(obj) ? obj: new MixedChunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, Chunks, function (obj) {
  return this.test(obj) ? obj: new Chunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, StarChunks, function (obj) {
  return this.test(obj) ? obj: new MixedChunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, MixedChunks, function (obj) {
  return this.test(obj) ? obj: new MixedChunks(this.chunk + ',' + obj.chunk);
});

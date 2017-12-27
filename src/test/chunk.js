/* eslint-disable no-invalid-this */
import {test} from '../methods';
import Chunk, {StarChunk} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';

test(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk;
});

test(Chunk, StarChunk, function (obj) {
  return obj.testChunk(this.chunk);
});

test(Chunk, Chunks, function (obj) {
  return obj.testChunk(this.chunk);
});

test(Chunk, StarChunks, function (obj) {
  return obj.testChunk(this.chunk);
});

test(Chunk, MixedChunks, function (obj) {
  return obj.testChunk(this.chunk);
});

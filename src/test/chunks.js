/* eslint-disable no-invalid-this */
import {test} from '../methods';
import Chunk, {StarChunk} from '../chunk';
import Chunks from '../chunks';

test(Chunks, Chunks, function (obj) {
  return Array.from(obj.chunks).every(chunk => this.testChunk(chunk));
});

test(Chunks, Chunk, function (obj) {
  return this.testChunk(obj.chunk);
});

test(Chunks, StarChunk, function (obj) {
  return this.testStarChunk(obj);
});

/* eslint-disable no-invalid-this */
import {test} from '../methods';
import Chunk from '../chunk';
import Chunks from '../chunks';

test(Chunks, Chunks, function (obj) {
  return obj.every(chunk => this.testChunk(obj.chunk));
});

test(Chunks, Chunk, function (obj) {
  return this.testChunk(obj.chunk);
});

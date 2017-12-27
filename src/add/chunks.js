/* eslint-disable no-invalid-this */
import {add} from '../methods';
import Chunk from '../chunk';
import Chunks from '../chunks';

add(Chunks, Chunks, function (obj) {
  return new Chunks(this.chunk + ',' + obj.chunk);
});

add(Chunks, Chunk, function (obj) {
  return new Chunks(this.chunk + ',' + obj.chunk);
});

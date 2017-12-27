/* eslint-disable no-invalid-this */
import add from '../add';
import Chunk, {StarChunk} from '../chunk';
import Chunks from '../chunks';

add(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk ? this :
    new Chunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, StarChunk, function (obj) {
  return obj.regex.test(this.chunk) ? obj:
    new Chunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, Chunks, function (obj) {
  return new Chunks(this.chunk + ',' + obj.chunk);
});

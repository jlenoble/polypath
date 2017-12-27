/* eslint-disable no-invalid-this */
import add from '../add';
import Chunk, {StarChunk} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';

add(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk ? this :
    new Chunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, StarChunk, function (obj) {
  return obj.test(this) ? obj: new MixedChunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, Chunks, function (obj) {
  return new Chunks(this.chunk + ',' + obj.chunk);
});

add(Chunk, StarChunks, function (obj) {
  return obj.test(this) ? obj: new MixedChunks(this.chunk + ',' + obj.chunk);
});

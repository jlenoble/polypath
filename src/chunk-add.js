/* eslint-disable no-invalid-this */
import add from './add';
import Chunk from './chunk';
import Chunks from './chunks';

add(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk ? this :
    new Chunks(this.chunk + ',' + obj.chunk);
});

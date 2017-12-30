import Chunk, {StarChunk, Empty, Star} from './chunk';
import Chunks, {StarChunks, MixedChunks} from './chunks';

export default class ChunkFactory {
  constructor (chunk) {
    if (typeof chunk !== 'string' || chunk === '') {
      return new Empty();
    }

    if (chunk.includes(',')) {
      return new ChunksFactory(chunk);
    }

    if (/^\*+$/.test(chunk)) {
      return new Star('*');
    }

    if (chunk.includes('*')) {
      return new StarChunk(chunk);
    }

    return new Chunk(chunk);
  }
}

export class ChunksFactory {
  constructor (_chunk) {
    const chunk = _chunk.replace(/,+/g, ',').replace(/(^,|,$)/g, '');

    if (/^\w+(,\w+)*$/.test(chunk)) {
      return new Chunks(chunk);
    }

    if (/^\w*(\*\w*)+(,\w*(\*\w*)+)*$/.test(chunk)) {
      return new StarChunks(chunk);
    }

    if (/^(\w|\*)+(,(\w|\*)+)*$/.test(chunk)) {
      return new MixedChunks(chunk);
    }

    return new Empty();
  }
}

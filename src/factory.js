import Chunk, {StarChunk, Empty, Star} from './chunk';
import Chunks, {StarChunks, MixedChunks} from './chunks';
import AntiChunk, {AntiStarChunk, AntiStar} from './antichunk';
import AntiChunks, {AntiStarChunks, AntiMixedChunks} from './antichunks';

export default class ChunkFactory {
  constructor (chunk) {
    if (typeof chunk !== 'string' || chunk === '') {
      return new Empty();
    }

    if (chunk.includes(',')) {
      return new ChunksFactory(chunk);
    }

    if (chunk.includes('!')) {
      return new AntiChunkFactory(chunk);
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

export class AntiChunkFactory {
  constructor (_chunk) {
    const chunk = _chunk.replace(/!!/g, '');

    if (/^!\*+$/.test(chunk)) {
      return new AntiStar('!*');
    }

    if (chunk.includes('*')) {
      return new AntiStarChunk(chunk);
    }

    return new AntiChunk(chunk);
  }
}

export class ChunksFactory {
  constructor (_chunk) {
    const chunk = _chunk.replace(/,+/g, ',').replace(/(^,|,$)/g, '');

    if (chunk.includes('!')) {
      return new AntiChunksFactory(chunk);
    }

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

export class AntiChunksFactory {
  constructor (_chunk) {
    const chunk = _chunk.replace(/!!/g, '');

    if (/^!\w+(,!\w+)*$/.test(chunk)) {
      return new AntiChunks(chunk);
    }

    if (/^!\w*(\*\w*)+(,!\w*(\*\w*)+)*$/.test(chunk)) {
      return new AntiStarChunks(chunk);
    }

    if (/^!(\w|\*)+(,!(\w|\*)+)*$/.test(chunk)) {
      return new AntiMixedChunks(chunk);
    }

    return new Empty();
  }
}

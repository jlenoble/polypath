import {error} from 'explanation';
import Chunk, {StarChunk, Star} from './chunk';

export default class AntiChunk extends Chunk {
  constructor (chunk) {
    if (!/^!/.test(chunk)) {
      error({
        message: 'Not an antichunk string',
        explain: [
          ['You attempted to initialize an AntiChunk object with:', chunk],
          'But the initialization argument must be a plain string',
          'preceded by an exclamation mark',
        ],
      });
    }

    super(chunk.substring(1));
  }
}

export class AntiStarChunk extends StarChunk {
  constructor (chunk) {
    if (!/^!/.test(chunk)) {
      error({
        message: 'Not an antistarchunk string',
        explain: [
          ['You attempted to initialize an AntiStarChunk object with:', chunk],
          'But the initialization argument must be a string including \'*\'',
          'preceded by an exclamation mark',
        ],
      });
    }

    super(chunk.substring(1));
  }
}

export class AntiStar extends Star {
  constructor (chunk) {
    if (!/^!/.test(chunk)) {
      error({
        message: 'Not an antistar string',
        explain: [
          ['You attempted to initialize an AntiStar object with:', chunk],
          'But the initialization argument must be stars only (*)',
          'preceded by an exclamation mark',
        ],
      });
    }

    super(chunk.substring(1));
  }
}

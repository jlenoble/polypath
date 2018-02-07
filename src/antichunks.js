import {error} from 'explanation';
import Chunks, {StarChunks, MixedChunks} from './chunks';

export default class AntiChunks extends Chunks {
  constructor (chunk) {
    if (!/^!/.test(chunk)) {
      error({
        message: 'Not word antichunks',
        explain: [
          ['You attempted to initialize an AntiChunks object with:', chunk],
          'But expected \'!chunk(,!chunk)*`\'',
        ],
      });
    }

    super(chunk.replace(/!/g, ''));
  }
}

export class AntiStarChunks extends StarChunks {
  constructor (chunk) {
    if (!/^!/.test(chunk)) {
      error({
        message: 'Not star antichunks',
        explain: [
          ['You attempted to initialize a AntiStarChunks object with:', chunk],
          'But expected \'!starchunk(,!starchunk)*`\'',
        ],
      });
    }

    super(chunk.replace(/!/g, ''));
  }
}

export class AntiMixedChunks extends MixedChunks {
  constructor (chunk) {
    if (!/^!/.test(chunk)) {
      error({
        message: 'Not mixed antichunks',
        explain: [
          ['You attempted to initialize a AntiMixedChunks object with:', chunk],
          'But expected \'!(chunk|starchunk)(,!(chunk|starchunk))*`\'',
        ],
      });
    }

    super(chunk.replace(/!/g, ''));
  }
}

import {error} from 'explanation';
import Chunk from './chunk';

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

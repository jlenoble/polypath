import {error} from 'explanation';
import Chunks, {StarChunks, MixedChunks} from './chunks';

export default class AntiChunks {
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

    const _chunk = new Chunks(chunk.replace(/!/g, ''));

    Object.defineProperties(this, {
      chunk: {
        value: _chunk.chunk.split(',').map(ch => '!' + ch).join(','),
        enumerable: true,
      },

      _chunk: {
        value: _chunk,
      },
    });
  }
}

export class AntiStarChunks {
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

    const _chunk = new StarChunks(chunk.replace(/!/g, ''));

    Object.defineProperties(this, {
      chunk: {
        value: _chunk.chunk.split(',').map(ch => '!' + ch).join(','),
        enumerable: true,
      },

      _chunk: {
        value: _chunk,
      },
    });
  }
}

export class AntiMixedChunks {
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

    const _chunk = new MixedChunks(chunk.replace(/!/g, ''));

    Object.defineProperties(this, {
      chunk: {
        value: _chunk.chunk.split(',').map(ch => '!' + ch).join(','),
        enumerable: true,
      },

      _chunk: {
        value: _chunk,
      },
    });
  }
}

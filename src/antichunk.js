import {error} from 'explanation';
import Chunk, {StarChunk} from './chunk';

export default class AntiChunk {
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

    const _chunk = new Chunk(chunk.substring(1));

    Object.defineProperties(this, {
      chunk: {
        value: '!' + _chunk.chunk,
        enumerable: true,
      },

      _chunk: {
        value: _chunk,
      },
    });
  }
}

export class AntiStarChunk {
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

    const _chunk = new StarChunk(chunk.substring(1));

    Object.defineProperties(this, {
      chunk: {
        value: '!' + _chunk.chunk,
        enumerable: true,
      },

      _chunk: {
        value: _chunk,
      },
    });
  }
}

export class AntiStar {
  constructor (chunk) {
    if (!/^!(!!)*\*+$/.test(chunk)) {
      error({
        message: 'Not an antistar',
        explain: [
          ['You attempted to initialize a Star object with:', chunk],
          'But the initialization argument must be negated stars (*) only',
        ],
      });
    }

    if (AntiStar.antistar) {
      return AntiStar.antistar;
    } else {
      AntiStar.antistar = this;
    }

    Object.defineProperties(this, {
      chunk: {
        value: '!*',
        enumerable: true,
      },
    });
  }

  test () {
    return true;
  }
}

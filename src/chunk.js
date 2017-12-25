import {error} from 'explanation';

export default class Chunk {
  constructor (chunk) {
    if (typeof chunk !== 'string' || !/^\w+$/.test(chunk)) {
      error({
        message: 'Not a word chunk',
        explain: [
          ['You attempted to initialize a Chunk object with:', chunk],
          'But the initialization argument must be a plain string',
        ],
      });
    }

    Object.defineProperties(this, {
      chunk: {
        value: chunk,
        enumerable: true,
      },
    });
  }
}

export class StarChunk {
  constructor (chunk) {
    if (!/^\w*(\*\w*)+$/.test(chunk)) {
      error({
        message: 'Not a star chunk',
        explain: [
          ['You attempted to initialize a StarChunk object with:', chunk],
          'But the initialization argument must be a string including \'*\'',
        ],
      });
    }

    Object.defineProperties(this, {
      chunk: {
        value: chunk,
        enumerable: true,
      },

      regex: {
        value: new RegExp(chunk.replace('*', '\\w*')),
      },
    });
  }
}

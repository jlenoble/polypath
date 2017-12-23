import {error} from 'explanation';

export default class Chunk {
  constructor (chunk) {
    if (typeof chunk !== 'string') {
      error({
        message: 'Not a string',
        explain: [
          ['You attempted to initialize a Chunk object with:', chunk],
          'But the initialization argument must be a string',
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

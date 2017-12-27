import {error} from 'explanation';

export default class Chunks {
  constructor (chunk) {
    if (typeof chunk !== 'string' || !/^\w+(,\w+)*$/.test(chunk)) {
      error({
        message: 'Not word chunks',
        explain: [
          ['You attempted to initialize a Chunks object with:', chunk],
          'But expected \'chunk(,chunk)*`\'',
        ],
      });
    }

    const set = new Set(chunk.split(','));

    Object.defineProperties(this, {
      chunk: {
        value: Array.from(set).sort().join(','),
        enumerable: true,
      },
    });
  }
}

export class StarChunks {
  constructor (chunk) {
    if (!/^\w*(\*\w*)+(,\w*(\*\w*)+)*$/.test(chunk)) {
      error({
        message: 'Not star chunks',
        explain: [
          ['You attempted to initialize a StarChunks object with:', chunk],
          'But expected \'starchunk(,starchunk)*`\'',
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

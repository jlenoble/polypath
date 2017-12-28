import {error} from 'explanation';
import {StarChunk} from './chunk';

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

      chunks: {
        value: set,
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

    const set = Array.from(new Set(chunk.split(','))).sort();

    Object.defineProperties(this, {
      chunk: {
        value: set.join(','),
        enumerable: true,
      },

      chunks: {
        value: set.map(chunk => new StarChunk(chunk)),
      },
    });
  }
}

export class MixedChunks {
  constructor (chunk) {
    if (!/^(\w|\*)+(,(\w|\*)+)*$/.test(chunk)) {
      error({
        message: 'Not mixed chunks',
        explain: [
          ['You attempted to initialize a MixedChunks object with:', chunk],
          'But expected \'(chunk|starchunk)(,(chunk|starchunk))*`\'',
        ],
      });
    }

    const set = Array.from(new Set(chunk.split(','))).sort();

    Object.defineProperties(this, {
      chunk: {
        value: set.join(','),
        enumerable: true,
      },

      chunks: {
        value: new Chunks(set.filter(chunk => !/\*/.test(chunk)).join(',')),
      },

      starchunks: {
        value: new StarChunks(set.filter(chunk => /\*/.test(chunk)).join(',')),
      },
    });
  }
}

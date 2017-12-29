import {error} from 'explanation';
import Chunk, {StarChunk} from './chunk';

export default class Chunks {
  constructor (chunk) {
    if (typeof chunk !== 'string' || !/^\w+(,\w+)+$/.test(chunk)) {
      error({
        message: 'Not word chunks',
        explain: [
          ['You attempted to initialize a Chunks object with:', chunk],
          'But expected \'chunk(,chunk)*`\'',
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
        value: set.map(chunk => new Chunk(chunk)),
      },
    });
  }

  test (obj) {
    return this.chunks.some(chunk => chunk.test(obj));
  }
}

export class StarChunks {
  constructor (chunk) {
    if (!/^\w*(\*\w*)+(,\w*(\*\w*)+)+$/.test(chunk)) {
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

  test (obj) {
    return this.chunks.some(starchunk => starchunk.test(obj));
  }
}

export class MixedChunks {
  constructor (chunk) {
    if (typeof chunk !== 'string' || !/^(\w|\*)+(,(\w|\*)+)+$/.test(chunk)) {
      error({
        message: 'Not mixed chunks',
        explain: [
          ['You attempted to initialize a MixedChunks object with:', chunk],
          'But expected \'(chunk|starchunk)(,(chunk|starchunk))*`\'',
        ],
      });
    }

    const set = Array.from(new Set(chunk.split(','))).sort();
    const chunks = set.filter(chunk => !/\*/.test(chunk)).map(
      chunk => new Chunk(chunk));
    const starchunks = set.filter(chunk => /\*/.test(chunk)).map(
      chunk => new StarChunk(chunk));

    if (!chunks.length || !starchunks.length) {
      error({
        message: 'Not mixed chunks',
        explain: [
          ['You attempted to initialize a MixedChunks object with:', chunk],
          'But expected \'(chunk|starchunk)(,(chunk|starchunk))*`\'',
          'And with at least one chunk and one starchunk',
        ],
      });
    }

    try {
      Object.defineProperties(this, {
        chunk: {
          value: set.join(','),
          enumerable: true,
        },

        chunks: {
          value: [...starchunks, ...chunks],
        },
      });
    } catch (e) {
      error({
        message: 'Not mixed chunks',
        explain: [
          ['You attempted to initialize a MixedChunks object with:', chunk],
          'But expected \'(chunk|starchunk)(,(chunk|starchunk))*`\'',
        ],
      });
    }
  }

  test (obj) {
    return this.chunks.some(starchunk => starchunk.test(obj));
  }
}

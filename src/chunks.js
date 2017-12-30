import {error} from 'explanation';
import Chunk, {StarChunk, Empty} from './chunk';

export default class Chunks {
  constructor (chunk) {
    if (typeof chunk !== 'string' || !/^\w+(,\w+)+$/.test(chunk)) {
      if (typeof chunk === 'string' && /^\w*$/.test(chunk)) {
        return new Chunk(chunk);
      }

      error({
        message: 'Not word chunks',
        explain: [
          ['You attempted to initialize a Chunks object with:', chunk],
          'But expected \'chunk(,chunk)*`\'',
        ],
      });
    }

    let set = new Set(chunk.split(','));

    if (set.has('')) {
      if (set.size === 1) {
        return new Empty();
      }

      set.delete('');
    }

    set = Array.from(set).sort();

    if (set.size === 1) {
      return new Chunk(set[0]);
    }

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
      if (/^\w*(\*\w*)+$/.test(chunk)) {
        return new StarChunk(chunk);
      }

      error({
        message: 'Not star chunks',
        explain: [
          ['You attempted to initialize a StarChunks object with:', chunk],
          'But expected \'starchunk(,starchunk)*`\'',
        ],
      });
    }

    const set = Array.from(new Set(chunk.split(',')));

    if (set.length === 1) {
      return new StarChunk(set[0]);
    }

    const chunks0 = set.map(chunk => new StarChunk(chunk));
    let chunks = [chunks0.shift()];

    do {
      const chunk = chunks0.shift();
      if (chunks.some(ch => ch.includes(chunk))) {
        continue;
      }
      chunks = chunks.filter(ch => !chunk.includes(ch)).concat(chunk);
    } while (chunks0.length);

    if (chunks.length === 1) {
      return chunks[0];
    }

    Object.defineProperties(this, {
      chunk: {
        value: chunks.map(chunk => chunk.chunk).sort().join(','),
        enumerable: true,
      },

      chunks: {
        value: chunks,
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

    let set = Array.from(new Set(chunk.split(',')));
    let chunks = set.filter(chunk => !/\*/.test(chunk));
    let starchunks = set.filter(chunk => /\*/.test(chunk));
    set = starchunks;

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

    chunks = chunks.map(chunk => new Chunk(chunk));
    starchunks = starchunks.map(chunk => new StarChunk(chunk));

    chunks = chunks.filter(chunk => !starchunks.some(
      starchunk => starchunk.includes(chunk)));

    if (!chunks.length) {
      return new StarChunks(set.join(','));
    }

    if (starchunks.length > 1) {
      const starchunks0 = starchunks;
      starchunks = [starchunks0.shift()];

      do {
        const starchunk = starchunks0.shift();
        if (starchunks.some(ch => ch.includes(starchunk))) {
          continue;
        }
        starchunks = starchunks.filter(ch => !starchunk.includes(ch))
          .concat(starchunk);
      } while (starchunks0.length);
    }

    chunks = [...starchunks, ...chunks];
    set = chunks.map(chunk => chunk.chunk).sort();

    try {
      Object.defineProperties(this, {
        chunk: {
          value: set.join(','),
          enumerable: true,
        },

        chunks: {
          value: chunks,
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

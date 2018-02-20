import {error} from 'explanation';
import Chunk, {StarChunk, Empty, Star} from './chunk';
import Chunks, {StarChunks, MixedChunks} from './chunks';

export default class ChunkFactory {
  constructor (chunk) {
    if (typeof chunk !== 'string' || chunk === '') {
      return new Empty();
    }

    if (chunk.includes(',')) {
      return new ChunksFactory(chunk);
    }

    if (chunk.includes('!')) {
      return new Empty();
    }

    if (/^\*+$/.test(chunk)) {
      return new Star('*');
    }

    if (chunk.includes('*')) {
      return new StarChunk(chunk);
    }

    return new Chunk(chunk);
  }
}

export class ChunksFactory {
  constructor (_chunk) {
    const chunk = _chunk.replace(/,+/g, ',').replace(/(^,|,$)/g, '');

    if (chunk.includes('!')) {
      return new FilteredChunks(chunk);
    }

    if (/^\w+(,\w+)*$/.test(chunk)) {
      return new Chunks(chunk);
    }

    if (/^\w*(\*\w*)+(,\w*(\*\w*)+)*$/.test(chunk)) {
      return new StarChunks(chunk);
    }

    if (/^(\w|\*)+(,(\w|\*)+)*$/.test(chunk)) {
      return new MixedChunks(chunk);
    }

    return new Empty();
  }
}

function isEmpty (ch) {
  return ch === '' || /^!(\*|\w)+(,!(\*|\w)+)*,(\*|\w)+(,!?(\*|\w)+)*$/
    .test(ch.replace(/!!/g, ''));
}

function negate (chunk) {
  return chunk.split(',').map(ch => {
    return isEmpty(ch) ? '' : '!' + ch;
  }).join(',');
}

export class FilteredChunks {
  constructor (chunk) {
    if (typeof chunk !== 'string' ||
      !/^(\w|\*)+(,!?(\w|\*)+)+$/.test(chunk)) {
      error({
        message: 'Not filtered chunks',
        explain: [
          ['You attempted to initialize a FilteredChunks object with:', chunk],
          'But expected \'(chunk|starchunk)(,!?(chunk|starchunk))+`\'',
        ],
      });
    }

    const _chunks = chunk.split(',');
    let array = [];
    let chunks = [array];
    let ch = _chunks.shift();
    let pos = true;

    while (ch !== undefined) {
      const neg = /^!/.test(ch);

      if (neg) {
        ch = ch.substring(1);
      }

      if (neg !== pos) {
        array.push(ch);
      } else {
        array = [ch];
        chunks.push(array);
        pos = !pos;
      }

      ch = _chunks.shift();
    }

    ch = chunks.shift();

    chunks = [
      new ChunkFactory(ch.join(',')),
      new ChunkFactory(chunks.map((chs, i) => {
        const ch = chs.join(',');
        return i%2 ? negate(ch) : ch;
      }).join(',').replace(/,+/g, ',').replace(/(^,|,$)/g, '')),
    ];

    Object.defineProperties(this, {
      chunk: {
        value: chunks[0].chunk + ',' + negate(chunks[1].chunk),
        enumerable: true,
      },

      chunks: {
        value: chunks,
      },
    });
  }
}

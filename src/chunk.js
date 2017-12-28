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
        value: new RegExp(chunk.replace(/\*/g, '\\w*')),
      },
    });
  }

  test (chunk) {
    return this.regex.test(chunk);
  }
}

export class Empty {
  constructor () {
    Object.defineProperties(this, {
      chunk: {
        value: '',
        enumerable: true,
      },
    });

    if (Empty.empty) {
      return Empty.empty;
    } else {
      Empty.empty = this;
    }
  }
}

export class Star {
  constructor (chunk) {
    if (!/^\*+$/.test(chunk)) {
      error({
        message: 'Not a star',
        explain: [
          ['You attempted to initialize a Star object with:', chunk],
          'But the initialization argument must be stars only (*)',
        ],
      });
    }

    if (Star.star) {
      return Star.star;
    } else {
      Star.star = this;
    }

    Object.defineProperties(this, {
      chunk: {
        value: '*',
        enumerable: true,
      },
    });
  }
}

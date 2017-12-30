import {expect} from 'chai';
import Chunk from '../../src/index';

const tests = {
  '': {
    '': true,
    '*': true,
    'a': true,
    'b': true,
    'a*': true,
    'b*': true,
    'a,b': true,
    'b,c': true,
    'a*,b*': true,
    'b*,c*': true,
    'a*,b': true,
    'a,b*': true,
    'b*,c': true,
  },
  '*': {
    '': false,
    '*': true,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,c': false,
  },
  'a': {
    '': false,
    '*': true,
    'a': true,
    'b': false,
    'a*': true,
    'b*': false,
    'a,b': true,
    'b,c': false,
    'a*,b*': true,
    'b*,c*': false,
    'a*,b': true,
    'a,b*': true,
    'b*,c': false,
  },
  'a*': {
    '': false,
    '*': true,
    'a': false,
    'b': false,
    'a*': true,
    'b*': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': true,
    'b*,c*': false,
    'a*,b': true,
    'a,b*': false,
    'b*,c': false,
  },
  'a,b': {
    '': false,
    '*': true,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'a,b': true,
    'b,a': true,
    'b,c': false,
    'a*,b*': true,
    'b*,c*': false,
    'a*,b': true,
    'a,b*': true,
    'b*,c': false,
  },
  'a*,b*': {
    '': false,
    '*': true,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': true,
    'b*,a*': true,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,c': false,
  },
  'a*,b': {
    '': false,
    '*': true,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': true,
    'b*,c*': false,
    'a*,b': true,
    'b,a*': true,
    'a,b*': false,
    'b*,c': false,
  },
  'a,b*': {
    '': false,
    '*': true,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': true,
    'b*,c*': false,
    'a*,b': false,
    'b,a*': false,
    'a,b*': true,
    'b*,c': false,
  },
};

Object.keys(tests).forEach(chunk1 => {
  const c1 = new Chunk(chunk1);

  describe(`'${chunk1}' of type ${c1.constructor.name}`, function () {
    Object.keys(tests[chunk1]).forEach(chunk2 => {
      const c2 = new Chunk(chunk2);

      if (tests[chunk1][chunk2]) {
        it(`is included by '${chunk2}'`, function () {
          expect(c1.isIncluded(c2)).to.be.true;
        });
      } else {
        it(`isn't included by '${chunk2}'`, function () {
          expect(c1.isIncluded(c2)).to.be.false;
        });
      }
    });
  });
});

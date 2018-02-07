import {expect} from 'chai';
import Chunk from '../../src/index';

const tests = {
  '': {
    '': false,
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
    '': true,
    '*': false,
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
  'a': {
    '': true,
    '*': true,
    'a': false,
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
  'a*': {
    '': true,
    '*': true,
    'a': true,
    'b': true,
    'a*': false,
    'b*': true,
    'a,b': true,
    'b,c': true,
    'a*,b*': true,
    'b*,c*': true,
    'a*,b': true,
    'a,b*': true,
    'b*,c': true,
  },
  'a,b': {
    '': true,
    '*': true,
    'a': true,
    'b': true,
    'a*': true,
    'b*': true,
    'a,b': false,
    'b,a': false,
    'b,c': true,
    'a*,b*': true,
    'b*,c*': true,
    'a*,b': true,
    'a,b*': true,
    'b*,c': true,
  },
  'a*,b*': {
    '': true,
    '*': true,
    'a': true,
    'b': true,
    'a*': true,
    'b*': true,
    'a,b': true,
    'b,c': true,
    'a*,b*': false,
    'b*,a*': false,
    'b*,c*': true,
    'a*,b': true,
    'a,b*': true,
    'b*,c': true,
  },
  'a*,b': {
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
    'a*,b': false,
    'b,a*': false,
    'a,b*': true,
    'b*,c': true,
  },
  'a,b*': {
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
    'a,b*': false,
    'b*,a': false,
    'b*,c': true,
  },
};

Object.keys(tests).forEach(chunk1 => {
  const c1 = new Chunk(chunk1);

  describe(`'${chunk1}' of type ${c1.constructor.name}`, function () {
    Object.keys(tests[chunk1]).forEach(chunk2 => {
      const c2 = new Chunk(chunk2);

      if (tests[chunk1][chunk2]) {
        it(`is not equal to '${chunk2}'`, function () {
          expect(c1.chunk).not.to.equal(c2.chunk);
          expect(c1.unequals(c2)).to.be.true;
        });
      } else {
        it(`is equal to '${chunk2}'`, function () {
          expect(c1.chunk).to.equal(c2.chunk);
          expect(c1.unequals(c2)).to.be.false;
        });
      }
    });
  });
});

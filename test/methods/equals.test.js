import {expect} from 'chai';
import Chunk from '../../src/index';

const tests = {
  '': {
    '': true,
    '*': false,
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
    '*': false,
    'a': true,
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
  'a*': {
    '': false,
    '*': false,
    'a': false,
    'b': false,
    'a*': true,
    'b*': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,c': false,
  },
  'a,b': {
    '': false,
    '*': false,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'a,b': true,
    'b,a': true,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,c': false,
  },
  'a*,b*': {
    '': false,
    '*': false,
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
    '*': false,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': true,
    'b,a*': true,
    'a,b*': false,
    'b*,c': false,
  },
  'a,b*': {
    '': false,
    '*': false,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': true,
    'b*,a': true,
    'b*,c': false,
  },
};

function noop (chunk) {
  return chunk;
}

function negate (chunk) {
  return chunk.split(',').map(ch => '!' + ch).join(',');
}

function getTestParams (tests, tfm1, tfm2) {
  const _tests = [];

  Object.keys(tests).forEach(chunk1 => {
    const _chunk1 = tfm1(chunk1);

    Object.keys(tests[chunk1]).forEach(chunk2 => {
      const _chunk2 = tfm2(chunk2);

      if (_chunk1 !== '!' && _chunk2 !== '!') {
        _tests.push([_chunk1, _chunk2, tfm1 === tfm2 && tests[chunk1][chunk2]]);
      }
    });
  });

  return _tests;
}

function makeTests (tests) {
  tests.forEach(([chunk1, chunk2, isEqual]) => {
    const c1 = new Chunk(chunk1);

    describe(`'${chunk1}' of type ${c1.constructor.name}`, function () {
      const c2 = new Chunk(chunk2);

      if (isEqual) {
        it(`is equal to '${chunk2}'`, function () {
          if (chunk1.includes('!') * chunk2.includes('!') === 1) {
            expect(c1.chunk).to.equal(c2.chunk);
          }
          expect(c1.equals(c2)).to.be.true;
        });
      } else {
        it(`is not equal to '${chunk2}'`, function () {
          if (chunk1.includes('!') * chunk2.includes('!') === 1) {
            expect(c1.chunk).not.to.equal(c2.chunk);
          }
          expect(c1.equals(c2)).to.be.false;
        });
      }
    });
  });
}

const tests1 = getTestParams(tests, noop, noop);
const tests2 = getTestParams(tests, negate, negate);
const tests3 = getTestParams(tests, noop, negate);
const tests4 = getTestParams(tests, negate, noop);

makeTests(tests1.concat(tests2, tests3, tests4));

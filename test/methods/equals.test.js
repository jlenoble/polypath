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
        _tests.push(`${_chunk1}#${_chunk2}#${
          tfm1 === tfm2 && tests[chunk1][chunk2]}`);
      }
    });
  });

  return _tests;
}

function mergeTestParams (tests, funcs) {
  let params = [];

  funcs.forEach(func1 => {
    funcs.forEach(func2 => {
      params = params.concat(getTestParams(tests, func1, func2));
    });
  });

  return params;
}

function makeTests (tests) {
  describe(`Testing 'equals' method`, function () {
    tests.forEach(str => {
      const [chunk1, chunk2, res] = str.split('#');
      const c1 = new Chunk(chunk1);
      const c2 = new Chunk(chunk2);

      if (res === 'true') {
        it(`'${chunk1}' of type ${c1.constructor.name} is equal to '${
          chunk2}'`, function () {
          if (chunk1.includes('!') * chunk2.includes('!') === 1) {
            expect(c1.chunk).to.equal(c2.chunk);
          }
          expect(c1.equals(c2)).to.be.true;
        });
      } else {
        it(`'${chunk1}' of type ${c1.constructor.name} is not equal to '${
          chunk2}'`, function () {
          if (chunk1.includes('!') * chunk2.includes('!') === 1) {
            expect(c1.chunk).not.to.equal(c2.chunk);
          }
          expect(c1.equals(c2)).to.be.false;
        });
      }
    });
  });
}

const funcs = [noop, negate];

makeTests(mergeTestParams(tests, funcs));

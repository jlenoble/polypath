import {expect} from 'chai';
import Chunk from '../../src/index';

const tests1 = {
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

const tests2 = {};

Object.keys(tests1).forEach(chunk1 => {
  const _chunk1 = chunk1.split(',').map(ch => '!' + ch).join(',');

  tests2[_chunk1] = {};

  Object.keys(tests1[chunk1]).forEach(chunk2 => {
    const _chunk2 = chunk2.split(',').map(ch => '!' + ch).join(',');

    if (_chunk1 !== '!' && _chunk2 !== '!') {
      tests2[_chunk1][_chunk2] = tests1[chunk1][chunk2];
    }
  });
});

const tests3 = {};

Object.keys(tests1).forEach(chunk1 => {
  tests3[chunk1] = {};

  Object.keys(tests1[chunk1]).forEach(chunk2 => {
    const _chunk2 = chunk2.split(',').map(ch => '!' + ch).join(',');

    if (_chunk2 !== '!') {
      tests3[chunk1][_chunk2] = true;
    }
  });
});

const tests4 = {};

Object.keys(tests1).forEach(chunk1 => {
  const _chunk1 = chunk1.split(',').map(ch => '!' + ch).join(',');

  tests4[_chunk1] = {};

  Object.keys(tests1[chunk1]).forEach(chunk2 => {
    if (_chunk1 !== '!') {
      tests4[_chunk1][chunk2] = true;
    }
  });
});

function defineTests (tests) {
  Object.keys(tests).forEach(chunk1 => {
    const c1 = new Chunk(chunk1);

    describe(`'${chunk1}' of type ${c1.constructor.name}`, function () {
      Object.keys(tests[chunk1]).forEach(chunk2 => {
        const c2 = new Chunk(chunk2);

        if (tests[chunk1][chunk2]) {
          it(`is not equal to '${chunk2}'`, function () {
            if (chunk1.includes('!') * chunk2.includes('!') === 1) {
              expect(c1.chunk).not.to.equal(c2.chunk);
            }
            expect(c1.unequals(c2)).to.be.true;
          });
        } else {
          it(`is equal to '${chunk2}'`, function () {
            if (chunk1.includes('!') * chunk2.includes('!') === 1) {
              expect(c1.chunk).to.equal(c2.chunk);
            }
            expect(c1.unequals(c2)).to.be.false;
          });
        }
      });
    });
  });
}

defineTests(Object.assign({}, tests1, tests2));
defineTests(Object.assign({}, tests3, tests4));

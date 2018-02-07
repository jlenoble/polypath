import {expect} from 'chai';
import Chunk from '../../src/index';

const tests1 = {
  '': {
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
    'a,b*': false,
    'b*,c': false,
  },
  '*': {
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
    'a,b*': false,
    'b*,c': false,
  },
  'a': {
    '': false,
    '*': false,
    'a': false,
    'b': true,
    'a*': false,
    'b*': true,
    'a,b': false,
    'b,c': true,
    'a*,b*': false,
    'b*,c*': true,
    'a*,b': false,
    'a,b*': false,
    'b*,c': true,
  },
  'a*': {
    '': false,
    '*': false,
    'a': false,
    'b': true,
    'a*': false,
    'b*': true,
    '*b': false,
    'a,b': false,
    'b,c': true,
    'a*,b*': false,
    'b*,c*': true,
    'a*,b': false,
    'a,b*': false,
    'b*,c': true,
    '*b,c': false,
  },
  'a,b': {
    '': false,
    '*': false,
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    'c*': true,
    '*c': true,
    'a,b': false,
    'b,a': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,c': false,
    'c,d': true,
  },
  'a*,b*': {
    '': false,
    '*': false,
    'a': false,
    'b': false,
    'c': true,
    'a*': false,
    'b*': false,
    'c*': true,
    '*c': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,a*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,c': false,
    'c,d': true,
  },
  'a*,b': {
    '': false,
    '*': false,
    'a': false,
    'b': false,
    'c': true,
    'a*': false,
    'b*': false,
    'c*': true,
    '*c': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'b,a*': false,
    'a,b*': false,
    'b*,c': false,
    'c,d': true,
  },
  'a,b*': {
    '': false,
    '*': false,
    'a': false,
    'b': false,
    'c': true,
    'a*': false,
    'b*': false,
    'c*': true,
    '*c': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,a': false,
    'b*,c': false,
    'c,d': true,
  },
  'abc*ed*f*gh': {
    'a*h': false,
    'abc*ed*f*gh': false,
    'ab*e*gh': false,
    'ab*e*gh*': false,
    '*ab*e*gh': false,
    'a*cedf*h': false,
    'ac*ed*gh': true,
    'abc*ed*f*g': true,
    'bc*ed*f*gh': true,
  },
  '*abc*ed*f*gh': {
    'a*h': false,
    'abc*ed*f*gh': false,
    'ab*e*gh': false,
    'ab*e*gh*': false,
    '*ab*e*gh': false,
    'a*cedf*h': false,
    'ac*ed*gh': false,
    'abc*ed*f*g': true,
    'bc*ed*f*gh': false,
  },
  'abc*ed*f*gh*': {
    'a*h': false,
    'abc*ed*f*gh': false,
    'ab*e*gh': false,
    'ab*e*gh*': false,
    '*ab*e*gh': false,
    'a*cedf*h': false,
    'ac*ed*gh': true,
    'abc*ed*f*g': false,
    'bc*ed*f*gh': true,
  },
  '*abc*ed*f*gh*': {
    'a*h': false,
    'abc*ed*f*gh': false,
    'ab*e*gh': false,
    'ab*e*gh*': false,
    '*ab*e*gh': false,
    'a*cedf*h': false,
    'ac*ed*gh': false,
    'abc*ed*f*g': false,
    'bc*ed*f*gh': false,
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
      tests3[chunk1][_chunk2] = chunk1 !== '';
    }
  });
});

const tests4 = {};

Object.keys(tests1).forEach(chunk1 => {
  const _chunk1 = chunk1.split(',').map(ch => '!' + ch).join(',');

  tests4[_chunk1] = {};

  Object.keys(tests1[chunk1]).forEach(chunk2 => {
    if (_chunk1 !== '!') {
      tests4[_chunk1][chunk2] = chunk2 !== '';
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
          it(`is distinct from '${chunk2}'`, function () {
            expect(c1.isDistinct(c2)).to.be.true;
          });
        } else {
          it(`isn't distinct from '${chunk2}'`, function () {
            expect(c1.isDistinct(c2)).to.be.false;
          });
        }
      });
    });
  });
}

defineTests(Object.assign({}, tests1, tests2));
defineTests(Object.assign({}, tests3, tests4));

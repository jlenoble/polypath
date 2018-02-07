import {expect} from 'chai';
import Chunk from '../../src/index';

const tests1 = {
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
  'a': {
    '': true,
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
    '': true,
    '*': false,
    'a': true,
    'b': false,
    'a*': true,
    'b*': false,
    '*b': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,c': false,
  },
  '*a': {
    '': true,
    '*': false,
    'a': true,
    'b': false,
    'a*': false,
    'b*': false,
    '*b': false,
    'a,b': false,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': false,
    'b*,c': false,
  },
  'a,b': {
    '': true,
    '*': false,
    'a': true,
    'b': true,
    'a*': false,
    'b*': false,
    '*b': false,
    '*c': false,
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
    '': true,
    '*': false,
    'a': true,
    'b': true,
    'a*': true,
    'b*': true,
    'a,b': true,
    'b,c': false,
    'a*,b*': true,
    'b*,a*': true,
    'b*,c*': false,
    'a*,b': true,
    'a,b*': true,
    'b*,c': false,
  },
  'a*,b': {
    '': true,
    '*': false,
    'a': true,
    'b': true,
    'a*': true,
    'b*': false,
    'a,b': true,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': true,
    'b,a*': true,
    'a,b*': false,
    'b*,c': false,
  },
  'a,b*': {
    '': true,
    '*': false,
    'a': true,
    'b': true,
    'a*': false,
    'b*': true,
    'a,b': true,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': true,
    'b*,a': true,
    'b*,c': false,
  },
  'a*h': {
    'a*ed*f*h': true,
    'abc*ed*f*h': true,
    'a*ed*f*gh': true,
    'abc*ed*f*gh': true,
  },
  'abc*ed*f*gh': {
    'a*h': false,
    'abc*ed*f*gh': true,
    'abc*ed*fff*gh': true,
    'ac*ed*fff*gh': false,
    'abc*ed*g*gh': false,
  },
  '*abc*ed*f*gh': {
    'abc*ed*f*gh': true,
  },
  'ab*e*gh*': {
    'abc*ed*f*gh': true,
  },
  'abc*ed*f*g': {
    'abc*ed*f*gh': false,
  },
  'bc*ed*f*gh': {
    'abc*ed*f*gh': false,
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
      tests3[chunk1][_chunk2] = false;
    }
  });
});

const tests4 = {};

Object.keys(tests1).forEach(chunk1 => {
  const _chunk1 = chunk1.split(',').map(ch => '!' + ch).join(',');

  tests4[_chunk1] = {};

  Object.keys(tests1[chunk1]).forEach(chunk2 => {
    if (_chunk1 !== '!') {
      tests4[_chunk1][chunk2] = chunk2 === '';
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
          it(`includes '${chunk2}'`, function () {
            expect(c1.includes(c2)).to.be.true;
          });
        } else {
          it(`doesn't include '${chunk2}'`, function () {
            expect(c1.includes(c2)).to.be.false;
          });
        }
      });
    });
  });
}

defineTests(Object.assign({}, tests1, tests2));
defineTests(Object.assign({}, tests3, tests4));

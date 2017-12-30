import {expect} from 'chai';
import Chunk from '../../src/index';

const tests = {
  'a': {
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

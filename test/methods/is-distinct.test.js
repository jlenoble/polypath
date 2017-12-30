import {expect} from 'chai';
import Chunk from '../../src/index';

const tests = {
  'a': {
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

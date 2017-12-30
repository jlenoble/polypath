import {expect} from 'chai';
import Chunk from '../../src/index';

const tests = {
  'a': {
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
    'a': true,
    'b': false,
    'a*': true,
    'b*': false,
    '*b': true,
    'a,b': true,
    'b,c': false,
    'a*,b*': true,
    'b*,c*': false,
    'a*,b': true,
    'a,b*': true,
    'b*,c': false,
    '*b,c': true,
  },
  'a,b': {
    'a': true,
    'b': true,
    'a*': true,
    'b*': true,
    'c*': false,
    '*c': false,
    'a,b': true,
    'b,a': true,
    'b,c': true,
    'a*,b*': true,
    'b*,c*': true,
    'a*,b': true,
    'a,b*': true,
    'b*,c': true,
    'c,d': false,
  },
  'a*,b*': {
    'a': true,
    'b': true,
    'c': false,
    'a*': true,
    'b*': true,
    'c*': false,
    '*c': true,
    'a,b': true,
    'b,c': true,
    'a*,b*': true,
    'b*,a*': true,
    'b*,c*': true,
    'a*,b': true,
    'a,b*': true,
    'b*,c': true,
    'c,d': false,
  },
  'a*,b': {
    'a': true,
    'b': true,
    'c': false,
    'a*': true,
    'b*': true,
    'c*': false,
    '*c': true,
    'a,b': true,
    'b,c': true,
    'a*,b*': true,
    'b*,c*': true,
    'a*,b': true,
    'b,a*': true,
    'a,b*': true,
    'b*,c': true,
    'c,d': false,
  },
  'a,b*': {
    'a': true,
    'b': true,
    'c': false,
    'a*': true,
    'b*': true,
    'c*': false,
    '*c': true,
    'a,b': true,
    'b,c': true,
    'a*,b*': true,
    'b*,c*': true,
    'a*,b': true,
    'a,b*': true,
    'b*,a': true,
    'b*,c': true,
    'c,d': false,
  },
  'abc*ed*f*gh': {
    'a*h': true,
    'abc*ed*f*gh': true,
    'ab*e*gh': true,
    'ab*e*gh*': true,
    '*ab*e*gh': true,
    'a*cedf*h': true,
    'ac*ed*gh': false,
    'abc*ed*f*g': false,
    'bc*ed*f*gh': false,
  },
  '*abc*ed*f*gh': {
    'a*h': true,
    'abc*ed*f*gh': true,
    'ab*e*gh': true,
    'ab*e*gh*': true,
    '*ab*e*gh': true,
    'a*cedf*h': true,
    'ac*ed*gh': true,
    'abc*ed*f*g': false,
    'bc*ed*f*gh': true,
  },
  'abc*ed*f*gh*': {
    'a*h': true,
    'abc*ed*f*gh': true,
    'ab*e*gh': true,
    'ab*e*gh*': true,
    '*ab*e*gh': true,
    'a*cedf*h': true,
    'ac*ed*gh': false,
    'abc*ed*f*g': true,
    'bc*ed*f*gh': false,
  },
  '*abc*ed*f*gh*': {
    'a*h': true,
    'abc*ed*f*gh': true,
    'ab*e*gh': true,
    'ab*e*gh*': true,
    '*ab*e*gh': true,
    'a*cedf*h': true,
    'ac*ed*gh': true,
    'abc*ed*f*g': true,
    'bc*ed*f*gh': true,
  },
};

Object.keys(tests).forEach(chunk1 => {
  const c1 = new Chunk(chunk1);

  describe(`'${chunk1}' of type ${c1.constructor.name}`, function () {
    Object.keys(tests[chunk1]).forEach(chunk2 => {
      const c2 = new Chunk(chunk2);

      if (tests[chunk1][chunk2]) {
        it(`overlaps with '${chunk2}'`, function () {
          expect(c1.overlaps(c2)).to.be.true;
        });
      } else {
        it(`doesn't overlap with '${chunk2}'`, function () {
          expect(c1.overlaps(c2)).to.be.false;
        });
      }
    });
  });
});

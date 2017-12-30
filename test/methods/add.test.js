import {expect} from 'chai';
import Chunk from '../../src/index';

const tests = {
  'a': {
    'a': 'a',
    'b': 'a,b',
    'a*': 'a*',
    'b*': 'a,b*',
    'a,b': 'a,b',
    'b,c': 'a,b,c',
    'a*,b*': 'a*,b*',
    'b*,c*': 'a,b*,c*',
    'a*,b': 'a*,b',
    'a,b*': 'a,b*',
    'b*,c': 'a,b*,c',
  },
  'a*': {
    'a': 'a*',
    'b': 'a*,b',
    'a*': 'a*',
    'b*': 'a*,b*',
    '*b': 'a*,*b',
    'a,b': 'a*,b',
    'b,c': 'a*,b,c',
    'a*,b*': 'a*,b*',
    'b*,c*': 'a*,b*,c*',
    'a*,b': 'a*,b',
    'a,b*': 'a*,b*',
    'b*,c': 'a*,b*,c',
    '*b,c': 'a*,*b,c',
  },
  'a,b': {
    'a': 'a,b',
    'b': 'a,b',
    'a*': 'a*,b',
    'b*': 'a,b*',
    'c*': 'a,b,c*',
    '*c': 'a,b,*c',
    'a,b': 'a,b',
    'b,a': 'a,b',
    'b,c': 'a,b,c',
    'a*,b*': 'a*,b*',
    'b*,c*': 'a,b*,c*',
    'a*,b': 'a*,b',
    'a,b*': 'a,b*',
    'b*,c': 'a,b*,c',
    'c,d': 'a,b,c,d',
  },
  'a*,b*': {
    'a': 'a*,b*',
    'b': 'a*,b*',
    'c': 'a*,b*,c',
    'a*': 'a*,b*',
    'b*': 'a*,b*',
    'c*': 'a*,b*,c*',
    '*c': 'a*,b*,*c',
    'a,b': 'a*,b*',
    'b,c': 'a*,b*,c',
    'a*,b*': 'a*,b*',
    'b*,a*': 'a*,b*',
    'b*,c*': 'a*,b*,c*',
    'a*,b': 'a*,b*',
    'a,b*': 'a*,b*',
    'b*,c': 'a*,b*,c',
    'c,d': 'a*,b*,c,d',
  },
  'a*,b': {
    'a': 'a*,b',
    'b': 'a*,b',
    'c': 'a*,b,c',
    'a*': 'a*,b',
    'b*': 'a*,b*',
    'c*': 'a*,b,c*',
    '*c': 'a*,b,*c',
    'a,b': 'a*,b',
    'b,c': 'a*,b,c',
    'a*,b*': 'a*,b*',
    'b*,c*': 'a*,b*,c*',
    'a*,b': 'a*,b',
    'b,a*': 'a*,b',
    'a,b*': 'a*,b*',
    'b*,c': 'a*,b*,c',
    'c,d': 'a*,b,c,d',
  },
  'a,b*': {
    'a': 'a,b*',
    'b': 'a,b*',
    'c': 'a,b*,c',
    'a*': 'a*,b*',
    'b*': 'a,b*',
    'c*': 'a,b*,c*',
    '*c': 'a,b*,*c',
    'a,b': 'a,b*',
    'b,c': 'a,b*,c',
    'a*,b*': 'a*,b*',
    'b*,c*': 'a,b*,c*',
    'a*,b': 'a*,b*',
    'a,b*': 'a,b*',
    'b*,a': 'a,b*',
    'b*,c': 'a,b*,c',
    'c,d': 'a,b*,c,d',
  },
  'abc*ed*f*gh': {
    'a*h': 'a*h',
    'abc*ed*f*gh': 'abc*ed*f*gh',
    'ab*e*gh': 'ab*e*gh',
    'ab*e*gh*': 'ab*e*gh*',
    '*ab*e*gh': '*ab*e*gh',
    'a*cedf*h': 'abc*ed*f*gh,a*cedf*h',
    'ac*ed*gh': 'abc*ed*f*gh,ac*ed*gh',
    'abc*ed*f*g': 'abc*ed*f*gh,abc*ed*f*g',
    'bc*ed*f*gh': 'abc*ed*f*gh,bc*ed*f*gh',
  },
  '*abc*ed*f*gh': {
    'a*h': '*abc*ed*f*gh,a*h',
    'abc*ed*f*gh': '*abc*ed*f*gh',
    'ab*e*gh': '*abc*ed*f*gh,ab*e*gh',
    'ab*e*gh*': '*abc*ed*f*gh,ab*e*gh*',
    '*ab*e*gh': '*ab*e*gh',
    'a*cedf*h': '*abc*ed*f*gh,a*cedf*h',
    'ac*ed*gh': '*abc*ed*f*gh,ac*ed*gh',
    'abc*ed*f*g': '*abc*ed*f*gh,abc*ed*f*g',
    'bc*ed*f*gh': '*abc*ed*f*gh,bc*ed*f*gh',
  },
  'abc*ed*f*gh*': {
    'a*h': 'abc*ed*f*gh*,a*h',
    'abc*ed*f*gh': 'abc*ed*f*gh*',
    'ab*e*gh': 'abc*ed*f*gh*,ab*e*gh',
    'ab*e*gh*': 'ab*e*gh*',
    '*ab*e*gh': 'abc*ed*f*gh*,*ab*e*gh',
    'a*cedf*h': 'abc*ed*f*gh*,a*cedf*h',
    'ac*ed*gh': 'abc*ed*f*gh*,ac*ed*gh',
    'abc*ed*f*g': 'abc*ed*f*gh*,abc*ed*f*g',
    'bc*ed*f*gh': 'abc*ed*f*gh*,bc*ed*f*gh',
  },
  '*abc*ed*f*gh*': {
    'a*h': '*abc*ed*f*gh*,a*h',
    'abc*ed*f*gh': '*abc*ed*f*gh*',
    'ab*e*gh': '*abc*ed*f*gh*,ab*e*gh',
    'ab*e*gh*': '*abc*ed*f*gh*,ab*e*gh*',
    '*ab*e*gh': '*abc*ed*f*gh*,*ab*e*gh',
    'a*cedf*h': '*abc*ed*f*gh*,a*cedf*h',
    'ac*ed*gh': '*abc*ed*f*gh*,ac*ed*gh',
    'abc*ed*f*g': '*abc*ed*f*gh*,abc*ed*f*g',
    'bc*ed*f*gh': '*abc*ed*f*gh*,bc*ed*f*gh',
  },
};

Object.keys(tests).forEach(chunk1 => {
  const c1 = new Chunk(chunk1);

  describe(`'${chunk1}' of type ${c1.constructor.name}`, function () {
    Object.keys(tests[chunk1]).forEach(chunk2 => {
      const chunk3 = tests[chunk1][chunk2];
      const c2 = new Chunk(chunk2);
      const c3 = new Chunk(chunk3);

      if (tests[chunk1][chunk2]) {
        it(`added with '${chunk2}' yields ${chunk3}`, function () {
          expect(c1.add(c2).chunk).to.equal(c3.chunk);
        });
      }
    });
  });
});

import {expect} from 'chai';
import Chunk from '../../src/index';

const tests = {
  'a': {
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
  'a*': {
    'a': false,
    'b': false,
    'a*': false,
    'b*': false,
    '*b': true,
    'a,b': true,
    'b,c': false,
    'a*,b*': false,
    'b*,c*': false,
    'a*,b': false,
    'a,b*': true,
    'b*,c': false,
    '*b,c': true,
  },
  'a,b': {
    'a': false,
    'b': false,
    'a*': true,
    'b*': true,
    'c*': false,
    '*c': false,
    'a,b': false,
    'b,a': false,
    'b,c': true,
    'a*,b*': false,
    'b*,c*': true,
    'a*,b': false,
    'a,b*': false,
    'b*,c': true,
    'c,d': false,
  },
  'a*,b*': {
    'a': false,
    'b': false,
    'c': false,
    'a*': false,
    'b*': false,
    'c*': false,
    '*c': true,
    'a,b': false,
    'b,c': true,
    'a*,b*': false,
    'b*,a*': false,
    'b*,c*': true,
    'a*,b': false,
    'a,b*': false,
    'b*,c': true,
    'c,d': false,
  },
  'a*,b': {
    'a': false,
    'b': false,
    'c': false,
    'a*': false,
    'b*': true,
    'c*': false,
    '*c': true,
    'a,b': false,
    'b,c': true,
    'a*,b*': false,
    'b*,c*': true,
    'a*,b': false,
    'b,a*': false,
    'a,b*': true,
    'b*,c': true,
    'c,d': false,
  },
  'a,b*': {
    'a': false,
    'b': false,
    'c': false,
    'a*': true,
    'b*': false,
    'c*': false,
    '*c': true,
    'a,b': false,
    'b,c': true,
    'a*,b*': false,
    'b*,c*': true,
    'a*,b': true,
    'a,b*': false,
    'b*,a': false,
    'b*,c': true,
    'c,d': false,
  },
  'abc*ed*f*gh': {
    'a*h': false,
    'abc*ed*f*gh': false,
    'ab*e*gh': false,
    'ab*e*gh*': false,
    '*ab*e*gh': false,
    'a*cedf*h': true, // abczedfgh, acedfh, abcedfgh
    'ac*ed*gh': false,
    'abc*ed*f*g': false,
    'bc*ed*f*gh': false,
  },
  '*abc*ed*f*gh': {
    'a*h': true, // zabcedfgh, ah, abcedfgh
    'abc*ed*f*gh': false,
    'ab*e*gh': true, // zabcedfgh, abegh, abcedfgh
    'ab*e*gh*': true, // zabcedfgh, abegh, abcedfgh
    '*ab*e*gh': false,
    'a*cedf*h': true, // abczedfgh, acedfh, abcedfgh
    'ac*ed*gh': true, // abcedfgh, acedgh, acedabcedfgh
    'abc*ed*f*g': false,
    'bc*ed*f*gh': true, // abcedfgh, bcedfgh, bcabcedfgh
  },
  'abc*ed*f*gh*': {
    'a*h': true, // abcedfghz, ah, abcedfgh
    'abc*ed*f*gh': false,
    'ab*e*gh': true, // abcedfghz, abegh, abcedfgh
    'ab*e*gh*': false,
    '*ab*e*gh': true, // abcedfghz, abegh, abcedfgh
    'a*cedf*h': true, // abczedfgh, acedfh, abcedfgh
    'ac*ed*gh': false,
    'abc*ed*f*g': true, // abcedfgh, abcedfh, abcedfghg
    'bc*ed*f*gh': false,
  },
  '*abc*ed*f*gh*': {
    'a*h': true, // abcedfghz, ah, abcedfgh
    'abc*ed*f*gh': false,
    'ab*e*gh': true, // abcedfghz, abegh, abcedfgh
    'ab*e*gh*': true, // zabcedfgh, abegh, abcedfgh
    '*ab*e*gh': true, // abcedfghz, abegh, abcedfgh
    'a*cedf*h': true, // abczedfgh, acedfh, abcedfgh
    'ac*ed*gh': true, // abcedfgh, acedgh, acedabcedfgh
    'abc*ed*f*g': true, // abcedfgh, abcedfh, abcedfghg
    'bc*ed*f*gh': true, // abcedfgh, bcedfgh, bcabcedfgh
  },
};

Object.keys(tests).forEach(chunk1 => {
  const c1 = new Chunk(chunk1);

  describe(`'${chunk1}' of type ${c1.constructor.name}`, function () {
    Object.keys(tests[chunk1]).forEach(chunk2 => {
      const c2 = new Chunk(chunk2);

      if (tests[chunk1][chunk2]) {
        it(`overlaps strictly with '${chunk2}'`, function () {
          expect(c1.overlapsStrictly(c2)).to.be.true;
        });
      } else {
        it(`doesn't overlap strictly with '${chunk2}'`, function () {
          expect(c1.overlapsStrictly(c2)).to.be.false;
        });
      }
    });
  });
});

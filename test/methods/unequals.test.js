import {expect} from 'chai';
import {makeBoolTests} from './helpers';
import {isEqual} from './init_helpers';

function isUnequal (ch1, ch2) {
  return !isEqual(ch1, ch2);
}

makeBoolTests({
  init: isUnequal,

  describeTitle: `Testing 'unequals' method`,

  trueTitle (c1, c2) {
    return `'${c1.chunk}' of type ${c1.constructor.name} is unequal to '${
      c2.chunk}'`;
  },

  falseTitle (c1, c2) {
    return `'${c1.chunk}' of type ${c1.constructor.name} is not unequal to '${
      c2.chunk}'`;
  },

  trueTest (c1, c2) {
    return function () {
      expect(c1.chunk).not.to.equal(c2.chunk);
      expect(c1.unequals(c2)).to.be.true;
    };
  },

  falseTest (c1, c2) {
    return function () {
      expect(c1.chunk).to.equal(c2.chunk);
      expect(c1.unequals(c2)).to.be.false;
    };
  },
});

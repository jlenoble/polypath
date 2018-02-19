import {expect} from 'chai';
import {makeBoolTests} from './helpers';
import {isEqual} from './init_helpers';

makeBoolTests({
  init: isEqual,

  describeTitle: `Testing 'equals' method`,

  trueTitle (c1, c2) {
    return `'${c1.chunk}' of type ${c1.constructor.name} is equal to '${
      c2.chunk}'`;
  },

  falseTitle (c1, c2) {
    return `'${c1.chunk}' of type ${c1.constructor.name} is not equal to '${
      c2.chunk}'`;
  },

  trueTest (c1, c2) {
    return function () {
      expect(c1.chunk).to.equal(c2.chunk);
      expect(c1.equals(c2)).to.be.true;
    };
  },

  falseTest (c1, c2) {
    return function () {
      expect(c1.chunk).not.to.equal(c2.chunk);
      expect(c1.equals(c2)).to.be.false;
    };
  },
});

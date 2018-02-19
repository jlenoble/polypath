import {expect} from 'chai';
import {makeBoolTests, equalSet, equalList, toList} from './helpers';

function isEqual (ch1, ch2) {
  if (!equalSet(ch1, ch2)) {
    return false;
  }

  const l1 = toList(ch1);

  if (l1.every(ch => ch[0] !== '!')) { // all chunks
    return true;
  }

  if (l1.every(ch => ch[0] === '!')) { // all antichunks
    return true;
  }

  return equalList(ch1, ch2); // FilteredChunks can't swap their elements
}

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

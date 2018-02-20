import {error} from 'explanation';
import {equalSet, equalList, toList, traverse, isEmpty, negate}
  from './helpers';

export function isEqual (ch1, ch2) {
  if (isEmpty(ch1) && isEmpty(ch2)) {
    return true;
  }

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

export function lookUp (tests) {
  return (ch1, ch2) => {
    if (tests[ch1] === undefined) {
      error(new ReferenceError(`No field '${ch1}' in tests`));
    }

    if (tests[ch1][ch2] === undefined) {
      error(new ReferenceError(`No field '${ch2}' in tests['${ch1}']`));
    }

    return tests[ch1][ch2];
  };
}

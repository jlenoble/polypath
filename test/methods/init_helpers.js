import {equalSet, equalList, toList, isEmpty} from './helpers';

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

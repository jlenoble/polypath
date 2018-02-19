import {makeBoolTests} from './helpers';
import {isEqual} from './init_helpers';

function isUnequal (ch1, ch2) {
  return !isEqual(ch1, ch2);
}

makeBoolTests({
  init: isUnequal,

  verbIfTrue: 'is unequal to',
  verbIfFalse: 'is not unequal to',

  method: 'unequals',
});

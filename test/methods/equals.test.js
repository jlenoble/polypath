import {makeBoolTests} from './helpers';
import {isEqual} from './init_helpers';

makeBoolTests({
  init: isEqual,

  verbIfTrue: 'is equal to',
  verbIfFalse: 'is not equal to',

  method: 'equals',
});

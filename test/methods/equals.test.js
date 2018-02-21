import {initBoolTests} from './init_helpers';
import {makeBoolTests} from './helpers';

const tests = {};

makeBoolTests({
  tests: initBoolTests(tests),
  verbIfTrue: 'is equal to',
  verbIfFalse: 'is not equal to',
  method: 'equals',
});

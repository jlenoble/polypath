import {expect} from 'chai';
import Chunk from '../../src/index';

const chunks = [
  '', '*', 'a', 'b', 'a*', 'b*',
  'a,b', 'b,c', 'a*,b*', 'b*,c*', 'a*,b', 'a,b*', 'b*,c',
  'b,a', 'c,b', 'b*,a*', 'c*,b*', 'b,a*', 'b*,a', 'c,b*',
  '!a,b', '!b,c', '!a*,b*', '!b*,c*', '!a*,b', '!a,b*', '!b*,c',
  '!b,a', '!c,b', '!b*,a*', '!c*,b*', '!b,a*', '!b*,a', '!c,b*',
  'a,!b', 'b,!c', 'a*,!b*', 'b*,!c*', 'a*,!b', 'a,!b*', 'b*,!c',
  'b,!a', 'c,!b', 'b*,!a*', 'c*,!b*', 'b,!a*', 'b*,!a', 'c,!b*',
];

export function isEmpty (ch) {
  return ch === '' || /^!(\*|\w)+(,!(\*|\w)+)*,(\*|\w)+(,!?(\*|\w)+)*$/
    .test(ch.replace(/!!/g, ''));
}

export function negate (chunk) {
  return chunk.split(',').map(ch => {
    return isEmpty(ch) ? '' : '!' + ch;
  }).join(',');
}

export function toList (chunk) {
  return chunk
    .replace(/(!!|\s)/g, '')
    .split(',');
}

export function toSet (chunk) {
  return new Set(toList(chunk));
}

export function equalList (chunk1, chunk2) {
  const l1 = toList(chunk1);
  const l2 = toList(chunk2);

  return l1.length === l2.length && l1.every((ch, i) => ch === l2[i]);
}

export function equalSet (chunk1, chunk2) {
  const c1 = toSet(chunk1);
  const c2 = toSet(chunk2);

  return [...c1].every(ch => c2.has(ch)) && [...c2].every(ch => c1.has(ch));
}

export function initBoolTests (init) {
  const tests = {};

  chunks.forEach(ch1 => {
    tests[ch1] = {};

    const neg1 = negate(ch1);
    tests[neg1] = {};

    chunks.forEach(ch2 => {
      const neg2 = negate(ch2);

      tests[ch1][ch2] = init(ch1, ch2);

      if (neg1 !== '') {
        tests[neg1][ch2] = init(neg1, ch2);

        if (neg2 !== '') {
          tests[neg1][neg2] = init(neg1, neg2);
        }
      }

      if (neg2 !== '') {
        tests[ch1][neg2] = init(ch1, neg2);
      }
    });
  });

  return tests;
}

export function traverse (tests, func) {
  Object.keys(tests).forEach(ch1 => {
    Object.keys(tests[ch1]).forEach(ch2 => {
      func(ch1, ch2, tests);
    });
  });
}

export function map (tests, func) {
  const _tests = {};

  Object.keys(tests).forEach(ch1 => {
    _tests[ch1] = {};

    Object.keys(tests[ch1]).forEach(ch2 => {
      _tests[ch1][ch2] = func(ch1, ch2, tests);
    });
  });

  return _tests;
}

export function flatten (tests, func) {
  const _tests = [];

  Object.keys(tests).forEach(ch1 => {
    Object.keys(tests[ch1]).forEach(ch2 => {
      _tests.push(func(ch1, ch2, tests));
    });
  });

  return _tests;
}

export function makeBoolTests ({
  init, verbIfTrue, verbIfFalse, method,
}) {
  const tests = initBoolTests(init);
  const describeTitle = `Testing '${method}' method`;

  function title (c1, ch1, ch2, verb) {
    return `'${ch1}' of type ${c1.constructor.name} ${verb} '${
      ch2}'`;
  }

  const test = function (c1, c2, truth) {
    return function () {
      let exp;

      switch (method) {
      case 'equals':
        exp = expect(c1.chunk);
        if (!truth) {
          exp = exp['not'];
        }
        break;

      case 'unequals':
        exp = expect(c1.chunk);
        if (truth) {
          exp = exp['not'];
        }
      }

      if (exp) {
        exp.to.equal(c2.chunk);
      }

      expect(c1[method](c2)).to.be[truth ? 'true' : 'false'];
    };
  };

  describe(describeTitle, function () {
    traverse(tests, (ch1, ch2, tests) => {
      const c1 = new Chunk(ch1);
      const c2 = new Chunk(ch2);
      const truth = tests[ch1][ch2];
      const verb = truth ? verbIfTrue : verbIfFalse;

      it(title(c1, ch1, ch2, verb), test(c1, c2, truth));
    });
  });
}

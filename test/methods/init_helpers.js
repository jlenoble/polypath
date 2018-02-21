const chunks = {
  '': {},
  '*': {},
  'a': {},
  'a*': {},
  'a,b': {
    commute: true,
  },
  'a,b*': {
    commute: true,
  },
  'a*,b*': {
    commute: true,
  },
  'a,a': {
    reduce: 'a',
  },
  'a,a*': {
    commute: true,
    reduce: 'a*',
  },
  'a*,a*': {
    reduce: 'a*',
  },
  'a,!b': {
    reduce: 'a',
  },
  'a,!b*': {
    reduce: 'a',
  },
  'a*,!b': {
    reduce: 'a*',
  },
  'a*,!b*': {
    reduce: 'a*',
  },
  'a,!a': {
    reduce: '',
  },
  'a,!a*': {
    reduce: '',
  },
  'a*,!a': {},
  'a*,!a*': {
    reduce: '',
  },
};

export function filter (chunks, func) {
  const _chunks = {};

  Object.keys(chunks).forEach(ch => {
    const chunk = chunks[ch];
    if (func(chunk)) {
      _chunks[ch] = chunk;
    }
  });

  return _chunks;
};

export const single = chunk => {
  return !chunk.commute && !chunk.reduce && chunk.reduce !== '';
};
export const commute = chunk => {
  return chunk.commute;
};
export const reduce = chunk => {
  return chunk.reduce || chunk.reduce === '';
};

export const singles = filter(chunks, single);
export const commutables = filter(chunks, commute);
export const reducibles = filter(chunks, reduce);

export function enflate (chunks, func) {
  const _tests = [];

  Object.keys(chunks).forEach(ch1 => {
    _tests[ch1] = {};

    Object.keys(chunks).forEach(ch2 => {
      const value = func(ch1, ch2);

      if (value !== undefined) {
        _tests[ch1][ch2] = value;
      }
    });

    if (!Object.keys(_tests[ch1]).length) {
      delete _tests[ch1];
    }
  });

  return _tests;
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

export function initBoolTests (tests, options = {}) {
  return tests;
}

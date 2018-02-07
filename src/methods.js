import method from 'typed-method';

export const add = method('add', {
  symmetric: true,
});

export const equals = method('equals', {
  equal: true,
  negate: 'unequals',
});

export const includes = method('includes', {
  reciprocal: 'isIncluded',
  strict: 'includesStrictly',
  condition: 'unequals',
  strictReciprocal: 'isIncludedStrictly',
});

export const overlaps = method('overlaps', {
  symmetric: true,
  negate: 'isDistinct',
});

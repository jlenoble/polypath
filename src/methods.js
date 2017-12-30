import method from './method';

export const add = method('add');
export const remove = method('remove');

export const equals = method('equals', {commutative: true});
export const isDistinct = method('isDistinct');

export const includes = method('includes');
export const isIncluded = method('isIncluded');
export const includesStrictly = method('includesStrictly');
export const isIncludedStrictly = method('isIncludedStrictly');

export const overlaps = method('overlaps');
export const overlapsStrictly = method('overlapsStrictly');

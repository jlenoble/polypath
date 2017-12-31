import method from './method';

export const add = method('add', {commutative: true});
export const remove = method('remove');

export const equals = method('equals', {commutative: true});
export const isDistinct = method('isDistinct', {commutative: true});

export const includes = method('includes', {
  strict: function (obj) {
    return this.chunk !== obj.chunk;
  },
  reciprocal: 'isIncluded',
});

export const overlaps = method('overlaps', {commutative: true});
export const overlapsStrictly = method('overlapsStrictly', {commutative: true});

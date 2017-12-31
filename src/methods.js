import method from './method';

export const add = method('add', {commutative: true});
export const remove = method('remove');

export const equals = method('equals', {commutative: true});

export const includes = method('includes', {
  reciprocal: 'isIncluded',

  strict: function (obj) {
    return this.chunk !== obj.chunk;
  },
});

export const overlaps = method('overlaps', {
  commutative: true,
  negate: 'isDistinct',

  strict: function (obj) {
    return !this.includes(obj) && !obj.includes(this);
  },
});

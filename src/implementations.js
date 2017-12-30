/* eslint-disable no-invalid-this */
import {Empty} from './chunk';
import Chunks, {MixedChunks} from './chunks';

const empty = new Empty();

export const _true = function () {
  return true;
};

export const _false = function () {
  return false;
};

export const _identity = function (obj) {
  return obj;
};

export const _empty = function () {
  return empty;
};

export const _this = function () {
  return this;
};

export const _equals = function (obj) {
  return this.chunk === obj.chunk;
};

export const _equalsNot = function (obj) {
  return this.chunk !== obj.chunk;
};

export const _isDistinct = function (obj) {
  return !this.overlaps(obj);
};

export const _includes = function (obj) {
  return this.test(obj);
};

export const _includesAll = function (obj) {
  for (let chunk of obj.chunks) {
    if (!this.includes(chunk)) {
      return false;
    }
  }
  return true;
};

export const _includesSome = function (obj) {
  for (let chunk of obj.chunks) {
    if (this.includes(chunk)) {
      return true;
    }
  }
  return false;
};

export const _includesNot = function (obj) {
  return !this.includes(obj);
};

export const _includesStrictly = function (obj) {
  return this.chunk !== obj.chunk && this.includes(obj);
};

export const _isIncluded = function (obj) {
  return obj.includes(this);
};

export const _isIncludedStrictly = function (obj) {
  return this.chunk !== obj.chunk && obj.includes(this);
};

export const _isNotIncluded = function (obj) {
  return !obj.includes(this);
};

export const _overlaps = function (obj) {
  const overlaps = chunk => this.includes(chunk) || chunk.overlaps(this);

  if (obj.chunks) {
    for (let chunk of obj.chunks) {
      if (overlaps(chunk)) {
        return true;
      }
    }
    return false;
  }

  return overlaps(obj);
};

export const _overlapsStrictly = function (obj) {
  return !this.includes(obj) && !obj.includes(this) && obj.overlaps(this);
};

export const _isOverlapped = function (obj) {
  return obj.overlaps(this);
};

export const _addMixed = function (obj) {
  return this.includes(obj) ? this : new MixedChunks(
    this.chunk + ',' + obj.chunk);
};

export const _addTo = function (obj) {
  return obj.add(this);
};

export const _addReduce = function (obj) {
  return obj.chunks.reduce((chunks, chunk) => {
    return chunks.add(chunk);
  }, this);
};

export const _maybeClearChunk = function (obj) {
  return obj.test(this) ? empty : this;
};

export const _filterChunks = function (obj) {
  const chunks = this.chunks.filter(chunk => !obj.includes(chunk));
  return chunks.length === this.chunks.length ? this : new Chunks(
    chunks.map(chunk => chunk.chunk).join(','));
};

export const _toBeImplemented = function () {
  // throw new Error('Needs implementation');
};

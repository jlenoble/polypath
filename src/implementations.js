/* eslint-disable no-invalid-this */
import {Empty} from './chunk';
import Chunks, {MixedChunks} from './chunks';

const empty = new Empty();

export const _true = function () {
  return true;
};

export const _trueButStrict = function () {
  return true;
};

export const _trueOnStrict = function () {
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

export const _unequals = function (obj) {
  return this.chunk !== obj.chunk;
};

export const _includes = function (obj) {
  return this.test(obj);
};

export const _includesAll = function (obj) {
  return obj.chunks.every(chunk => this.includes(chunk));
};

export const _includesSome = function (obj) {
  return obj.chunks.some(chunk => this.includes(chunk));
};

export const _overlapsSingle = function (obj) {
  return this.chunks.some(chunk => chunk.overlaps(obj));
};

export const _overlaps = function (obj) {
  return obj.chunks.some(chunk => this.includes(chunk) || chunk.overlaps(this));
};

export const _addMixed = function (obj) {
  return this.includes(obj) ? this : new MixedChunks(
    this.chunk + ',' + obj.chunk);
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

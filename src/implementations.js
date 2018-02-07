/* eslint-disable no-invalid-this */
import {MixedChunks} from './chunks';

export const _this = function () {
  return this;
};

export const _equals = function (obj) {
  return this.chunk === obj.chunk;
};

export const _includes = function (obj) {
  return this.test(obj);
};

export const _includesSome = function (obj) {
  return obj.chunks.some(chunk => this.includes(chunk));
};

export const _includesAll = function (obj) {
  return obj.chunks.every(chunk => this.includes(chunk));
};

export const _overlaps = function (obj) {
  return obj.chunks.some(chunk => this.includes(chunk) || chunk.overlaps(this));
};

export const _overlapsSingle = function (obj) {
  return this.chunks.some(chunk => chunk.overlaps(obj));
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

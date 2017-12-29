/* eslint-disable no-invalid-this */
import {Empty} from './chunk';
import Chunks, {StarChunks, MixedChunks} from './chunks';

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

export const _includesNot = function (obj) {
  return !this.includes(obj);
};

export const _isIncluded = function (obj) {
  return obj.includes(this);
};

export const _isNotIncluded = function (obj) {
  return !obj.includes(this);
};

export const _newChunksRight = function (obj) {
  return obj.test(this) ? obj : new Chunks(
    this.chunk + ',' + obj.chunk);
};

export const _newStarChunksRight = function (obj) {
  return obj.test(this) ? obj : new StarChunks(
    this.chunk + ',' + obj.chunk);
};

export const _newMixedChunksRight = function (obj) {
  return obj.test(this) ? obj : new MixedChunks(
    this.chunk + ',' + obj.chunk);
};

export const _clearRight = function (obj) {
  return obj.test(this) ? empty : this;
};

export const _toBeImplemented = function () {
  // throw new Error('Needs implementation');
};

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

export const _testLeft = function (obj) {
  return this.test(obj);
};

export const _testRight = function (obj) {
  return obj.test(this);
};

export const _antitestRight = function (obj) {
  return !obj.test(this);
};

export const _multiTest = function (obj) {
  for (let chunk of obj.chunks) {
    if (!this.includes(chunk)) {
      return false;
    }
  }
  return true;
};

export const _multiTestMixed = function (obj) {
  for (let chunk of obj.chunks.chunks) {
    if (!this.includes(chunk)) {
      return false;
    }
  }
  for (let chunk of obj.starchunks.chunks) {
    if (!this.includes(chunk)) {
      return false;
    }
  }
  return true;
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

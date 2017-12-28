/* eslint-disable no-invalid-this */
import Chunks, {StarChunks, MixedChunks} from './chunks';

export const _true = function () {
  return true;
};

export const _false = function () {
  return false;
};

export const _testRight = function (obj) {
  return obj.test(this.chunk);
};

export const _newChunksRight = function (obj) {
  return obj.test(this.chunk) ? obj : new Chunks(
    this.chunk + ',' + obj.chunk);
};

export const _newStarChunksRight = function (obj) {
  return obj.test(this.chunk) ? obj : new StarChunks(
    this.chunk + ',' + obj.chunk);
};

export const _newMixedChunksRight = function (obj) {
  return obj.test(this.chunk) ? obj : new MixedChunks(
    this.chunk + ',' + obj.chunk);
};

/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';
import Chunk from '../chunk';
import Chunks from '../chunks';

add(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk ? obj : new Chunks(
    this.chunk + ',' + obj.chunk);
});
remove(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk ? empty : this;
});
equals(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk;
});
isDistinct(Chunk, Chunk, function (obj) {
  return this.chunk !== obj.chunk;
});
includes(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk;
});
isIncluded(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk;
});
includesStrictly(Chunk, Chunk, function (obj) {
  return false;
});
isIncludedStrictly(Chunk, Chunk, function (obj) {
  return false;
});
overlaps(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk;
});
overlapsStrictly(Chunk, Chunk, function (obj) {
  return false;
});

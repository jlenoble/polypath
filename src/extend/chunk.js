/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';
import Chunk, {StarChunk, Star, Empty} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';

const empty = new Empty();

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

add(Chunk, StarChunk, function (obj) {
  return obj.regex.test(this.chunk) ? obj : new MixedChunks(
    this.chunk + ',' + obj.chunk);
});
remove(Chunk, StarChunk, function (obj) {
  return obj.regex.test(this.chunk) ? empty : this;
});
equals(Chunk, StarChunk, function (obj) {
  return false;
});
isDistinct(Chunk, StarChunk, function (obj) {
  return !obj.regex.test(this.chunk);
});
includes(Chunk, StarChunk, function (obj) {
  return false;
});
isIncluded(Chunk, StarChunk, function (obj) {
  return obj.regex.test(this.chunk);
});
includesStrictly(Chunk, StarChunk, function (obj) {
  return false;
});
isIncludedStrictly(Chunk, StarChunk, function (obj) {
  return obj.regex.test(this.chunk);
});
overlaps(Chunk, StarChunk, function (obj) {
  return obj.regex.test(this.chunk);
});
overlapsStrictly(Chunk, StarChunk, function (obj) {
  return obj.regex.test(this.chunk);
});


add(Chunk, Star, function (obj) {
  return obj;
});
remove(Chunk, Star, function (obj) {
  return empty;
});
equals(Chunk, Star, function (obj) {
  return false;
});
isDistinct(Chunk, Star, function (obj) {
  return false;
});
includes(Chunk, Star, function (obj) {
  return false;
});
isIncluded(Chunk, Star, function (obj) {
  return true;
});
includesStrictly(Chunk, Star, function (obj) {
  return false;
});
isIncludedStrictly(Chunk, Star, function (obj) {
  return true;
});
overlaps(Chunk, Star, function (obj) {
  return true;
});
overlapsStrictly(Chunk, Star, function (obj) {
  return true;
});

add(Chunk, Empty, function (obj) {
  return this;
});
remove(Chunk, Empty, function (obj) {
  return this;
});
equals(Chunk, Empty, function (obj) {
  return false;
});
isDistinct(Chunk, Empty, function (obj) {
  return true;
});
includes(Chunk, Empty, function (obj) {
  return true;
});
isIncluded(Chunk, Empty, function (obj) {
  return false;
});
includesStrictly(Chunk, Empty, function (obj) {
  return true;
});
isIncludedStrictly(Chunk, Empty, function (obj) {
  return false;
});
overlaps(Chunk, Empty, function (obj) {
  return true;
});
overlapsStrictly(Chunk, Empty, function (obj) {
  return true;
});

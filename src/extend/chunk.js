/* eslint-disable no-invalid-this */
import {add, remove, equals, isDistinct, includes, isIncluded, includesStrictly,
  isIncludedStrictly, overlaps, overlapsStrictly} from '../methods';

import {_true, _false, _testRight} from '../implementations';

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
includesStrictly(Chunk, Chunk, _false);
isIncluded(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk;
});
isIncludedStrictly(Chunk, Chunk, _false);
overlaps(Chunk, Chunk, function (obj) {
  return this.chunk === obj.chunk;
});
overlapsStrictly(Chunk, Chunk, _false);

add(Chunk, StarChunk, function (obj) {
  return obj.test(this.chunk) ? obj : new MixedChunks(
    this.chunk + ',' + obj.chunk);
});
remove(Chunk, StarChunk, function (obj) {
  return obj.test(this.chunk) ? empty : this;
});
equals(Chunk, StarChunk, _false);
isDistinct(Chunk, StarChunk, function (obj) {
  return !obj.test(this.chunk);
});
includes(Chunk, StarChunk, _false);
includesStrictly(Chunk, StarChunk, _false);
isIncluded(Chunk, StarChunk, _testRight);
isIncludedStrictly(Chunk, StarChunk, _testRight);
overlaps(Chunk, StarChunk, _testRight);
overlapsStrictly(Chunk, StarChunk, _testRight);

add(Chunk, Star, function (obj) {
  return obj;
});
remove(Chunk, Star, function (obj) {
  return empty;
});
equals(Chunk, Star, _false);
isDistinct(Chunk, Star, _false);
includes(Chunk, Star, _false);
includesStrictly(Chunk, Star, _false);
isIncluded(Chunk, Star, _true);
isIncludedStrictly(Chunk, Star, _true);
overlaps(Chunk, Star, _true);
overlapsStrictly(Chunk, Star, _true);

add(Chunk, Empty, function (obj) {
  return this;
});
remove(Chunk, Empty, function (obj) {
  return this;
});
equals(Chunk, Empty, _false);
isDistinct(Chunk, Empty, _false);
includes(Chunk, Empty, _true);
includesStrictly(Chunk, Empty, _true);
isIncluded(Chunk, Empty, _false);
isIncludedStrictly(Chunk, Empty, _false);
overlaps(Chunk, Empty, _true);
overlapsStrictly(Chunk, Empty, _true);

add(Chunk, Chunks, function (obj) {
  return obj.chunks.has(this.chunk) ? obj :
    new Chunks(this.chunk + ',' + obj.chunk);
});
remove(Chunk, Chunks, function (obj) {
  return obj.chunks.has(this.chunk) ? empty : this;
});
equals(Chunk, Chunks, function (obj) {
  return obj.chunks.size === 1 && obj.chunks.has(this.chunk);
});
isDistinct(Chunk, Chunks, function (obj) {
  return !obj.chunks.has(this.chunk);
});
includes(Chunk, Chunks, function (obj) {
  return obj.chunks.size === 1 && obj.chunks.has(this.chunk);
});
includesStrictly(Chunk, Chunks, _false);
isIncluded(Chunk, Chunks, function (obj) {
  return obj.chunks.has(this.chunk);
});
isIncludedStrictly(Chunk, Chunks, function (obj) {
  return obj.chunks.size > 1 && obj.chunks.has(this.chunk);
});
overlaps(Chunk, Chunks, function (obj) {
  return obj.chunks.has(this.chunk);
});
overlapsStrictly(Chunk, Chunks, function (obj) {
  return obj.chunks.size !== 1 && obj.chunks.has(this.chunk);
});

add(Chunk, StarChunks, function (obj) {
  return obj.chunks.some(chunk => chunk.regex.test(this.chunk)) ? obj :
    new MixedChunks(this.chunk + ',' + obj.chunk);
});
remove(Chunk, StarChunks, function (obj) {
  return obj.chunks.some(chunk => chunk.regex.test(this.chunk)) ? empty : this;
});
equals(Chunk, StarChunks, _false);
isDistinct(Chunk, StarChunks, function (obj) {
  return !obj.chunks.some(chunk => chunk.regex.test(this.chunk));
});
includes(Chunk, StarChunks, _false);
includesStrictly(Chunk, StarChunks, _false);
isIncluded(Chunk, StarChunks, function (obj) {
  return obj.chunks.some(chunk => chunk.regex.test(this.chunk));
});
isIncludedStrictly(Chunk, StarChunks, function (obj) {
  return obj.chunks.some(chunk => chunk.regex.test(this.chunk));
});
overlaps(Chunk, StarChunks, function (obj) {
  return obj.chunks.some(chunk => chunk.regex.test(this.chunk));
});
overlapsStrictly(Chunk, StarChunks, function (obj) {
  return obj.chunks.some(chunk => chunk.regex.test(this.chunk));
});

add(Chunk, MixedChunks, function (obj) {
  return obj.chunks.chunks.has(this.chunk) ||
    obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk)) ? obj :
    new MixedChunks(this.chunk + ',' + obj.chunk);
});
remove(Chunk, MixedChunks, function (obj) {
  return obj.chunks.chunks.has(this.chunk) ||
    obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk)) ? empty :
    this;
});
equals(Chunk, MixedChunks, _false);
isDistinct(Chunk, MixedChunks, function (obj) {
  return !obj.chunks.chunks.has(this.chunk) &&
    !obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk));
});
includes(Chunk, MixedChunks, _false);
includesStrictly(Chunk, MixedChunks, _false);
isIncluded(Chunk, MixedChunks, function (obj) {
  return obj.chunks.chunks.has(this.chunk) ||
    obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk));
});
isIncludedStrictly(Chunk, MixedChunks, function (obj) {
  return obj.chunks.chunks.has(this.chunk) ||
    obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk));
});
overlaps(Chunk, MixedChunks, function (obj) {
  return obj.chunks.chunks.has(this.chunk) ||
    obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk));
});
overlapsStrictly(Chunk, MixedChunks, function (obj) {
  return obj.chunks.chunks.has(this.chunk) ||
    obj.starchunks.chunks.some(chunk => chunk.regex.test(this.chunk));
});

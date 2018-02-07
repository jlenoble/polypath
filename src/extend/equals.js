import {equals} from '../methods';
import Chunk, {StarChunk, Empty, Star} from '../chunk';
import Chunks, {StarChunks, MixedChunks} from '../chunks';
import AntiChunk, {AntiStarChunk, AntiStar} from '../antichunk';
import AntiChunks, {AntiStarChunks, AntiMixedChunks} from '../antichunks';
import {_equals} from '../implementations';

const Types = [Chunk, StarChunk, Empty, Star, Chunks, StarChunks, MixedChunks,
  AntiChunk, AntiStarChunk, AntiStar, AntiChunks, AntiStarChunks,
  AntiMixedChunks];

for (let i = 0, l = Types.length; i < l; i++) {
  for (let j = i; j < l; j++) {
    equals(_equals, Types[i], Types[j]);
  }
}

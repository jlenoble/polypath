import ChunkFactory from './factory';
import Chunk from './chunk';
import Chunks from './chunks';
import AntiChunk from './antichunk';

import './extend';

export default ChunkFactory;

export {Chunk, Chunks, AntiChunk};
export {StarChunk, Empty, Star} from './chunk';
export {StarChunks, MixedChunks} from './chunks';
export {AntiStarChunk, AntiStar} from './antichunk';

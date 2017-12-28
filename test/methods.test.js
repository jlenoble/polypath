/* eslint-disable no-invalid-this */
import {expect} from 'chai';

import * as methods from '../src/methods';
import * as classes from '../src/index';

// import Muter, {muted} from 'muter';
// import Muter, {captured as muted} from 'muter';

// const muter = Muter(console);

const validArguments = {
  Chunk: ['a', 'abc'],
  StarChunk: ['a*', 'a*bc*'],
  Chunks: ['a', 'a,b,c'],
  StarChunks: ['a*', 'a*,b*,*c'],
  MixedChunks: ['a,*b', 'a*,b', '*x*,y,z'],
};

Object.keys(methods).forEach(methodKey => {
  Object.keys(classes).forEach(Type1Key => {
    const Type1 = classes[Type1Key];
    const args1 = validArguments[Type1Key];

    describe(`Type '${Type1Key}' has a method '${methodKey}'`, function () {
      Object.keys(classes).forEach(Type2Key => {
        const Type2 = classes[Type2Key];
        const args2 = validArguments[Type2Key];

        describe(`that doesn't throw for type '${Type2Key}'`, function () {
          args1.forEach(arg1 => {
            args2.forEach(arg2 => {
              it(`new ${Type1Key}('${arg1}').${methodKey}(new ${
                Type2Key}('${arg2}'))`, function () {
                expect(() => new Type1(arg1)[methodKey](new Type2(arg2)))
                  .not.to.throw();
              });
            });
          });
        });
      });
    });
  });
});

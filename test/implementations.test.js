import {expect} from 'chai';

import * as _methods from '../src/methods';
import * as _classes from '../src/index';

const methods = [];

Object.keys(_methods).forEach(methodKey => {
  if (methodKey === 'default') {
    return;
  }

  if (_methods[methodKey].methods) {
    methods.push(...Object.keys(_methods[methodKey].methods));
  } else {
    methods.push(methodKey);
  }
});

const classes = Object.assign({}, _classes);

if (classes.default) {
  delete classes.default;
}

const validArguments = {
  Chunk: ['a', 'abc'],
  StarChunk: ['a*', 'a*bc*'],
  Star: ['*', '**'],
  Empty: [''],
  Chunks: ['a,z', 'a,b,c'],
  StarChunks: ['a*,*z', 'a*,b*,*c'],
  MixedChunks: ['a,*b', 'a*,b', '*x*,y,z'],
  AntiChunk: ['!a', '!abc'],
  AntiStarChunk: ['!a*', '!a*bc*'],
  AntiStar: ['!*', '!**'],
};

methods.forEach(methodKey => {
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

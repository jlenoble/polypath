# polypath

A polyton for paths

  * [Usage](#usage)
  * [Convenience function `rebase`](#convenience-function-rebase)
  * [Convenience function `resolve`](#convenience-function-resolve)
  * [License](#license)


## Usage

```js
import PolyPath from 'polypath';
import path from 'path';

const cwd = process.cwd();

const p = new PolyPath('src', 'test.js');

expect(p.paths).to.eql([path.join(cwd, 'src'),path.join(cwd, 'test.js')]);
expect(p.basenames()).to.eql(['src', 'test.js']);expect(p.dirnames()).to.eql([cwd, cwd]);
expect(p.extnames()).to.eql(['', '.js']);

expect(p.relative(cwd)).to.eql(['src', 'test.js']);expect(p.relative('test')).to.eql(['../src', '../test.js']);

expect(p.rebase('build').paths).to.eql([
  path.join(cwd, 'build', 'src'),
  path.join(cwd, 'build', 'test.js')]);
```

## Convenience function `rebase`

`rebase(glob, base1[, base2])` rebases `glob` to `base1` if no `base2` is provided, or from `base1` to `base2` otherwise.

```js
import {rebase} from 'polypath';

rebase('src/*.js', 'build'); // ['cwd/build/src/*.js']
rebase(['src/*.js'], 'build'); // ['cwd/build/src/*.js']
rebase(['src/*.js', 'test/*.js'], 'build'); // ['cwd/build/src/*.js', 'cwd/build/test/*.js']

rebase('src/*.js', 'src', 'build'); // ['cwd/build/*.js']
rebase(['src/*.js'], 'src', 'build'); // ['cwd/build/*.js']
rebase(['src/*.js', 'test/*.js'], 'src', 'build'); // ['cwd/build/*.js', 'cwd/test/*.js']
```

## Convenience function `resolve`

`resolve(...globs)` return a promise with all file name matches in file system.

```js
import {resolve} from 'polypath';

resolve('src/*.js');   // valid
resolve(['src/*.js']); // valid

resolve(['src/*.js', 'test/*.js']);   // valid
resolve('src/*.js', 'test/*.js');     // valid
resolve(['src/*.js'], ['test/*.js']); // valid
```

## License

polypath is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)

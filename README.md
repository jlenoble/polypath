# polypath

A polyton for paths

  * [Usage](#usage)
  * [Convenience function `rebaseGlob`](#convenience-function-rebaseglob)
  * [Convenience function `resolveGlob`](#convenience-function-resolveglob)
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

## Convenience function `rebaseGlob`

`rebaseGlob(glob, base1[, base2])` rebaseGlobs `glob` to `base1` if no `base2` is provided, or from `base1` to `base2` otherwise.

```js
import {rebaseGlob} from 'polypath';

rebaseGlob('src/*.js', 'build'); // ['cwd/build/src/*.js']
rebaseGlob(['src/*.js'], 'build'); // ['cwd/build/src/*.js']
rebaseGlob(['src/*.js', 'test/*.js'], 'build'); // ['cwd/build/src/*.js', 'cwd/build/test/*.js']

rebaseGlob('src/*.js', 'src', 'build'); // ['cwd/build/*.js']
rebaseGlob(['src/*.js'], 'src', 'build'); // ['cwd/build/*.js']
rebaseGlob(['src/*.js', 'test/*.js'], 'src', 'build'); // ['cwd/build/*.js', 'cwd/test/*.js']
```

## Convenience function `resolveGlob`

`resolveGlob(...globs)` return a promise with all file name matches in file system.

```js
import {resolveGlob} from 'polypath';

resolveGlob('src/*.js');   // valid
resolveGlob(['src/*.js']); // valid

resolveGlob(['src/*.js', 'test/*.js']);   // valid
resolveGlob('src/*.js', 'test/*.js');     // valid
resolveGlob(['src/*.js'], ['test/*.js']); // valid
```

## License

polypath is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)

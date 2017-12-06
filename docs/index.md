## Usage !heading

#include "build/docs/examples/usage.test.md"

## Convenience function `rebase` !heading

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

## Convenience function `resolve` !heading

`resolve(...globs)` return a promise with all file name matches in file system.

```js
import {resolve} from 'polypath';

resolve('src/*.js');   // valid
resolve(['src/*.js']); // valid

resolve(['src/*.js', 'test/*.js']);   // valid
resolve('src/*.js', 'test/*.js');     // valid
resolve(['src/*.js'], ['test/*.js']); // valid
```

## License !heading

polypath is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)

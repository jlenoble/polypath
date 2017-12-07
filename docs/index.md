## Usage !heading

#include "build/docs/examples/usage.test.md"

## Convenience function `rebaseGlob` !heading

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

## Convenience function `resolveGlob` !heading

`resolveGlob(...globs)` return a promise with all file name matches in file system.

```js
import {resolveGlob} from 'polypath';

resolveGlob('src/*.js');   // valid
resolveGlob(['src/*.js']); // valid

resolveGlob(['src/*.js', 'test/*.js']);   // valid
resolveGlob('src/*.js', 'test/*.js');     // valid
resolveGlob(['src/*.js'], ['test/*.js']); // valid
```

## License !heading

polypath is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)

# polypath

A polyton for paths

  * [Usage](#usage)
  * [License](#license)


## Usage

```js
import PolyPath from 'polypath';

const cwd = process.cwd(); // '/home/me'
const p = new PolyPath('src', 'test.js');

p.paths; // ['/home/me/src', '/home/me/test.js']
p.basenames(); // ['src', 'test.js']);
p.dirnames(); // ['/home/me', '/home/me']);
p.extnames(); // ['', '.js']);

p.relative(cwd); // ['src', 'test.js']);
p.relative('test'); // ['../src', '../test.js']);

p.rebase('build').paths; // ['/home/me/build/src', '/home/me/build/test.js']
```

## License

polypath is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)

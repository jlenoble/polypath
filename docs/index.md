## Usage !heading

```js
import PolyPath from 'polypath';

const p = new PolyPath('~', 'src', 'test.js');

p.paths; // ['/home/me', '/home/me/projectdir/src', '/home/me/projectdir/test.js']
p.basenames(); // ['me', 'src', 'test.js']
p.dirnames(); // ['/home', '/home/me/projectdir', '/home/me/projectdir']
p.extnames(); // ['', '', '.js']
```

## License !heading

polypath is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)

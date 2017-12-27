import {error} from 'explanation';

const typeSymbols = new WeakMap();

export default function method (name) {
  if (typeof name !== 'string') {
    error({
      message: 'Not a string',
      explain: [
        'You must provide a name to the method generator',
        'All derived methods will share that name',
      ],
    });
  }

  const methodSymbols = new WeakMap();

  const _method = function (Type1, Type2, implementation) {
    if (!(Type1 instanceof Function)) {
      error({
        message: 'Not a prototype',
        explain: [
          ['In function:', _method.name],
          'You tried to access the prototype of Type1',
          'But Type1 is not a function',
          ['It is:', Type1],
        ],
      });
    }

    if (!(Type2 instanceof Function)) {
      error({
        message: 'Not a prototype',
        explain: [
          ['In function:', _method.name],
          'You tried to access the prototype of Type2',
          'But Type2 is not a function',
          ['It is:', Type2],
        ],
      });
    }

    let nNewlySet = 0;

    const p1 = Type1.prototype;
    const symName1 = `type:${Type1.name}`;

    const p2 = Type2.prototype;
    const symName2 = `${name}:${Type2.name}`;

    if (!typeSymbols.has(Type1)) {
      nNewlySet++;
      typeSymbols.set(Type1, Symbol(symName1));
    }

    const _type = typeSymbols.get(Type1);
    const symbs1 = Object.getOwnPropertySymbols(p2);
    const index1 = symbs1.map(s => s.toString()).indexOf(_type.toString());

    if (index1 !== -1) {
      if (symbs1[index1] !== _type) {
        error({
          message: `Symbols share name, but are different`,
          explain: [
            ['You attempted to set symbol', _type.toString()],
            ['on the prototype of type', Type2.name],
            ['with the intention to target', Type1.name],
            'But the symbol already exists',
            'and points to a parasitic type with same name',
          ],
        });
      }
    }

    if (!methodSymbols.has(Type2)) {
      nNewlySet++;
      methodSymbols.set(Type2, Symbol(symName2));
    }

    const _name = methodSymbols.get(Type2);

    if (nNewlySet === 0) {
      if (p2[_type] === Type1 && Type1[_name] !== undefined) {
        error({
          message: 'Both types are already coupled',
          explain: [
            [`In ${name} factory, type`, Type2.name],
            ['is already known to be coupled with type', Type1.name],
            [`You have probably defined a method ${name} on`, Type1.name],
            ['that can deal with', Type2.name],
          ],
        });
      }
    }

    const symbs2 = Object.getOwnPropertySymbols(Type1);
    const index2 = symbs2.map(s => s.toString()).indexOf(_name.toString());

    if (index2 !== -1) {
      if (symbs2[index2] !== _name) {
        error({
          message: `${Type1.name}::${name}(${Type2.name}) already implemented`,
          explain: [
            ['You attempted to set symbol', _name.toString()],
            ['on type', Type1.name],
            'But the symbol already exists',
            `This means that the '${name}' method has already been implemented`,
            ['for intended type', Type2.name],
            'or another parasitic type sharing its name',
          ],
        });
      }
    }

    p2[_type] = Type1;
    Type1[_name] = implementation; // eslint-disable-line no-param-reassign

    if (!p1.hasOwnProperty(name)) {
      p1[name] = function (a) {
        const Type2 = a.constructor;
        const _name = methodSymbols.get(Type2);

        try {
          return a[_type][_name].call(this, a);
        } catch (e) {
          if (new RegExp(`Cannot read property.*of undefined`)
            .test(e.message)) {
            const _p2 = a && Type2.name || typeof a;
            const explain = [
              [`You tried to run '${name}' of instance:`, this],
              ['of type', Type1.name],
              ['with argument:', a],
              ['of type', _p2],
            ];

            if (!a[_type] || !a[_type][_name]) {
              error({
                message: `${Type1.name} cannot run '${name}' with ${_p2}`,
                explain: explain.concat(
                  `But an implementation doesn't exist for this pair of types`),
              });
            } else if (e.message.includes(`property '${name}'`)) {
              error({
                message: `Undefined method ${name}`,
                explain: explain.concat([
                  `But method '${name}' was never defined`,
                  'Or an eponymous call appears somewhere in the call chain',
                ]),
              });
            }
          }

          throw e;
        }
      };
    }
  };

  return _method;
}

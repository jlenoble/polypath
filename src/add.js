import {error} from 'explanation';

const typeSymbols = new WeakMap();
const addSymbols = new WeakMap();

export default function add (Type1, Type2, implementation, options) {
  if (!(Type1 instanceof Function)) {
    error({
      message: 'Not a prototype',
      explain: [
        ['In function:', add.name],
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
        ['In function:', add.name],
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
  const symName2 = `add:${Type2.name}`;

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

  if (!addSymbols.has(Type2)) {
    nNewlySet++;
    addSymbols.set(Type2, Symbol(symName2));
  }

  if (nNewlySet === 0) {
    error({
      message: 'Both types are already coupled',
      explain: [
        ['In add factory, type', Type2.name],
        ['is already know to be coupled with type', Type1.name],
        ['You have probably defined a method add on ', Type1.name],
        ['that can deal with', Type2.name],
      ],
    });
  }

  const _add = addSymbols.get(Type2);
  const symbs2 = Object.getOwnPropertySymbols(Type1);
  const index2 = symbs2.map(s => s.toString()).indexOf(_add.toString());

  if (index2 !== -1) {
    if (symbs2[index2] !== _add) {
      error({
        message: `${Type1.name}::add(${Type2.name}) already implemented`,
        explain: [
          ['You attempted to set symbol', _add.toString()],
          ['on type', Type1.name],
          'But the symbol already exists',
          `This means that the 'add' method has already been implemented`,
          ['for intended type', Type2.name],
          'or another parasitic type sharing its name',
        ],
      });
    }
  }

  p2[_type] = Type1;
  Type1[_add] = implementation; // eslint-disable-line no-param-reassign

  if (!p1.hasOwnProperty('add')) {
    p1.add = function (a) {
      const Type2 = a.constructor;
      const _add = addSymbols.get(Type2);

      try {
        return a[_type][_add].call(this, a);
      } catch (e) {
        if (new RegExp(`Cannot read property.*of undefined`)
          .test(e.message)) {
          const _p2 = a && Type2.name || typeof a;

          error({
            message: `${Type1.name} cannot add with ${_p2}`,
            explain: [
              ['You tried to add:', this],
              ['of type', Type1.name],
              ['with:', a],
              ['of type', _p2],
            ],
          });
        }

        throw e;
      }
    };
  }
}

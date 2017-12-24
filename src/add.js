import {error} from 'explanation';

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

  const p2 = Type2.prototype;

  const symName1 = `type:${Type1.name}`;
  const symName2 = `add:${Type2.name}`;

  const symbs1 = Object.getOwnPropertySymbols(p2);
  const symb1 = Symbol(symName1);
  const index1 = symbs1.map(s => s.toString()).indexOf(symb1.toString());

  if (index1 !== -1) {
    if (p2[symbs1[index1]] !== Type1) {
      error({
        message: `Same 'type' symbol, but different type`,
        explain: [
          ['You attempted to set symbol', symb1.toString()],
          ['on the prototype of type', Type2.name],
          ['with the intention to target', Type1.name],
          'But the symbol already exists',
          'and points to a parasitic type with same name',
        ],
      });
    }
  }

  const _type1 = symb1;
  p2[_type1] = Type1;

  const symbs2 = Object.getOwnPropertySymbols(Type1);
  const symb2 = Symbol(symName2);
  const index2 = symbs2.map(s => s.toString()).indexOf(symb2.toString());

  if (index2 !== -1) {
    error({
      message: `${Type1.name}::add(${Type2.name}) already implemented`,
      explain: [
        ['You attempted to set symbol', symb2.toString()],
        ['on type', Type1.name],
        'But the symbol already exists',
        `This means that the 'add' method has already been implemented`,
        ['for intended type', Type2.name],
        'or another parasitic type sharing its name',
      ],
    });
  }

  const _add2 = index2 === -1 ? symb2 : symbs2[index2];
  Type1[_add2] = implementation; // eslint-disable-line no-param-reassign

  p2.add = function (a) {
    try {
      return a[_type1][_add2].call(this, a);
    } catch (e) {
      if (new RegExp(`Cannot read property.*add:${Type2.name}.*of undefined`)
        .test(e.message)) {
        const _p2 = a && a.constructor.name || typeof a;

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

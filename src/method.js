import {error} from 'explanation';

const typeSymbols = new WeakMap();

const checkType = (Type, name, argName) => {
  if (!(Type instanceof Function)) {
    error({
      message: 'Not a prototype',
      explain: [
        [`In 'method' factory:`, name],
        `You tried to access the prototype of ${argName}`,
        `But ${argName} is not a function`,
        `It is ${Type}`,
      ],
    });
  }
};

const checkSymbol = ({symb, obj, Type1, Type2, name = 'type'}) => {
  const symbs = Object.getOwnPropertySymbols(obj);
  const index = symbs.map(s => s.toString()).indexOf(symb.toString());

  if (index !== -1) {
    if (symbs[index] !== symb) {
      const message = name === 'type' ?
        `Symbols share name, but are different` :
        `${obj.name}::${name}(${Type2.name}) already implemented`;

      const explain = [['You attempted to set symbol', symb.toString()]];

      if (name === 'type') {
        explain.push(['on the prototype of type', Type2.name],
          ['with the intention to target', Type1.name]);
      } else {
        explain.push(['on type', obj.name]);
      }

      explain.push('But the symbol already exists');

      if (name === 'type') {
        explain.push('But the symbol already exists',
          'and points to a parasitic type with same name');
      } else {
        explain.push(
          `This means that the '${name}' method has already been implemented`,
          ['for intended type', Type2.name],
          'or another parasitic type sharing its name');
      }

      error({
        message,
        explain,
      });
    }
  }
};

const getVariables = (Type1, Type2, name, methodSymbols) => {
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

  if (!methodSymbols.has(Type2)) {
    nNewlySet++;
    methodSymbols.set(Type2, Symbol(symName2));
  }

  const _name = methodSymbols.get(Type2);

  return {
    p1, p2, _type, _name, nNewlySet,
  };
};

const checkCoupling = ({Type1, Type2, _type, _name, name, p2, nNewlySet}) => {
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
};

const makeSenseOfError = ({e, a, Type1, Type2, ctx, name, _type, _name}) => {
  if (new RegExp(`Cannot read property.*of undefined`)
    .test(e.message)) {
    const _p2 = a && Type2.name || typeof a;
    const explain = [
      [`You tried to run '${name}' of instance:`, ctx],
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
};

export default function method (name, {commutative = false} = {}) {
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

  const _method = function (Type1, Type2, implementation, {
    calledAlready = false} = {}) {
    checkType(Type1, name, 'Type1');
    checkType(Type2, name, 'Type2');

    const {p1, p2, _type, _name, nNewlySet} = getVariables(Type1, Type2, name,
      methodSymbols);

    checkSymbol({symb: _type, obj: p2, Type1, Type2, name: 'type'});
    checkCoupling({Type1, Type2, p2, _type, _name, name, nNewlySet});
    checkSymbol({symb: _name, obj: Type1, Type1, Type2, name: 'name'});

    p2[_type] = Type1;
    Type1[_name] = implementation; // eslint-disable-line no-param-reassign

    if (!p1.hasOwnProperty(name)) {
      p1[name] = function (a) {
        const Type2 = a.constructor;
        const _name = methodSymbols.get(Type2);

        try {
          return a[_type][_name].call(this, a);
        } catch (e) {
          makeSenseOfError({e, a, Type1, Type2, ctx: this, name, _type, _name});
          throw e;
        }
      };
    }

    if (!calledAlready && commutative && Type1 !== Type2) {
      _method(Type2, Type1, function (a) {
        return a[name](this); // eslint-disable-line no-invalid-this
      }, {calledAlready: true});
    }
  };

  return _method;
}

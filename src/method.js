import {error} from 'explanation';
import {_false, _true, _trueButStrict, _trueOnStrict, _this, _identity, _empty,
  _equals, _includes, _includesAll, _includesSome, _overlaps, _overlapsSingle}
  from './implementations';

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
  checkSymbol({symb: _type, obj: p2, Type1, Type2, name: 'type'});

  if (!methodSymbols.has(Type2)) {
    nNewlySet++;
    methodSymbols.set(Type2, Symbol(symName2));
  }

  const _name = methodSymbols.get(Type2);
  checkSymbol({symb: _name, obj: Type1, Type2, name});

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

const checkName = name => {
  if (typeof name !== 'string') {
    error({
      message: 'Not a string',
      explain: [
        'You must provide a name to the method generator',
        'All derived methods will share that name',
      ],
    });
  }
};

const makeCommuteImplementation = methodName => function (a) {
  return a[methodName](this); // eslint-disable-line no-invalid-this
};

const makeStrictImplementation = (methodName, strict) => function (obj) {
  // eslint-disable-next-line no-invalid-this
  return strict.call(this, obj) && this[methodName](obj);
};

const makeReciprocalImplementation = methodName => function (obj) {
  return obj[methodName](this); // eslint-disable-line no-invalid-this
};

const makeNegateImplementation = methodName => function (obj) {
  return !this[methodName](obj); // eslint-disable-line no-invalid-this
};

const makeWrapper = ({
  strict, reciprocal, commutative, negate, methodName, method,
}) => {
  const methods = {};

  const wrapper = function (Type1, Type2, implementation) {
    let args = [
      [implementation, methodName, {}],
    ];

    if (reciprocal) {
      args.push([makeReciprocalImplementation(methodName), reciprocal, {
        _reciprocal: reciprocal}]);
    }

    if (strict) {
      args = args.concat(args.map(([impl, name, opts]) => {
        return [makeStrictImplementation(name, strict), name + 'Strictly',
          Object.assign({_strict: strict}, opts)];
      }));
    }

    if (negate) {
      args.push([makeNegateImplementation(methodName), negate,
        {_negate: negate}]);
    }

    args.forEach(([impl, methodName, opts]) => {
      if (opts._reciprocal) {
        methods[methodName] = method(Type2, Type1, impl, Object.assign({
          overrideName: methodName}, opts));
      } else {
        methods[methodName] = method(Type1, Type2, impl, Object.assign({
          overrideName: methodName}, opts));
      }
    });
  };

  wrapper.methods = methods;

  return wrapper;
};

const getMethodSymbols = ({_reciprocal, _strict, _negate}, {
  baseMethodSymbols,
  strictMethodSymbols,
  reciprocalMethodSymbols,
  strictReciprocalMethodSymbols,
  negateMethodSymbols,
}) => {
  return _negate
    ? negateMethodSymbols
    : _strict
      ? _reciprocal
        ? strictReciprocalMethodSymbols
        : strictMethodSymbols
      : _reciprocal
        ? reciprocalMethodSymbols
        : baseMethodSymbols;
};

const optimizeStrictImplementation = (implementation, {p2, _name,
  _type}) => {
  switch (p2[_type][_name]) {
  case _false: case _trueButStrict: case _equals:
    return _false;

  case _trueOnStrict:
    return _true;

  default:
    console.log('>', p2[_type][_name]);
    // return implementation;
  }
};

const optimizeReciprocalImplementation = (implementation, {p2, _name,
  _type}) => {
  const impl = p2[_type][_name];

  switch (impl) {
  case _false: case _true: case _trueButStrict: case _trueOnStrict:
  case _equals:
    return impl;

  default:
    console.log('~', impl);
    // return implementation;
  }
};

const optimizeNegateImplementation = (implementation, {p2, _name,
  _type}) => {
  switch (p2[_type][_name]) {
  case _false:
    return _true;

  case _true: case _trueButStrict: case _trueOnStrict:
    return _false;

  default:
    console.log('-', p2[_type][_name]);
    // return implementation;
  }
};

let counter = 0;
const optimizeCommuteImplementation = (implementation, {p1, p2, _name,
  _type}) => {
  switch (p2[_type][_name]) {
  case _false:
    return _false;

  case _true:
    return _true;

  case _trueButStrict:
    return _trueButStrict;

  case _trueOnStrict:
    return _trueOnStrict;

  case _this:
    return _identity;

  case _identity:
    return _this;

  default:
    console.log(++counter + ')', _name, p1.constructor.name,
      p2.constructor.name, 'OTHER');
    return implementation;
  }
};

const optimizeImplementation = ({Type1, Type2, implementation, methodName,
  overrideName, methodSymbols, baseMethodSymbols,
  _commuteImplementation, _reciprocal, _strict, _negate}) => {
  if (_strict) {
    const impl = _reciprocal ?
      optimizeStrictImplementation(implementation,
        getVariables(Type2, Type1, methodName, baseMethodSymbols)) :
      optimizeStrictImplementation(implementation,
        getVariables(Type1, Type2, methodName, baseMethodSymbols));

    if (impl) {
      return impl;
    }
  }

  if (_reciprocal) {
    const impl = optimizeReciprocalImplementation(implementation,
      getVariables(Type2, Type1, methodName, baseMethodSymbols));

    if (impl) {
      return impl;
    }
  }

  if (_negate) {
    const impl = optimizeNegateImplementation(implementation,
      getVariables(Type1, Type2, methodName, baseMethodSymbols));

    if (impl) {
      return impl;
    }
  }

  switch (implementation) {
  case _commuteImplementation:
    return optimizeCommuteImplementation(implementation,
      getVariables(Type2, Type1, overrideName, methodSymbols));

  case _false: case _true: case _trueButStrict: case _trueOnStrict: case _this:
  case _identity: case _empty: case _equals: case _includes: case _includesAll:
  case _includesSome: case _overlaps: case _overlapsSingle:
    return implementation;

  default:
    console.log(++counter + ')', overrideName, Type1.name, Type2.name,
      'MAIN');
    return implementation;
  }
};

export default function method (methodName, {
  commutative, strict, reciprocal, negate,
} = {}) {
  checkName(methodName);

  const symbolMaps = {
    baseMethodSymbols: new WeakMap(),
    strictMethodSymbols: strict ? new WeakMap(): undefined,
    reciprocalMethodSymbols: reciprocal ? new WeakMap(): undefined,
    strictReciprocalMethodSymbols: reciprocal && strict ? new WeakMap() :
      undefined,
    negateMethodSymbols: negate ? new WeakMap(): undefined,
  };

  const _method = function (Type1, Type2, implementation, {
    calledAlready = false,
    overrideName, _reciprocal, _strict, _negate,
  } = {}) {
    const name = overrideName || methodName;
    const methodSymbols = getMethodSymbols({_reciprocal, _strict, _negate},
      symbolMaps);
    const _commuteImplementation = commutative ? !calledAlready ?
      makeCommuteImplementation(name) : implementation : undefined;

    checkType(Type1, name, 'Type1');
    checkType(Type2, name, 'Type2');

    const {p1, p2, _type, _name, nNewlySet} = getVariables(Type1, Type2, name,
      methodSymbols);

    checkCoupling({Type1, Type2, p2, _type, _name, name, nNewlySet});

    p2[_type] = Type1;

    // eslint-disable-next-line no-param-reassign
    Type1[_name] = optimizeImplementation({Type1, Type2, implementation,
      _commuteImplementation, _reciprocal, _strict, _negate, methodName,
      overrideName, methodSymbols,
      baseMethodSymbols: symbolMaps.baseMethodSymbols});

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
      _method(Type2, Type1, _commuteImplementation,
        {calledAlready: true, overrideName, _reciprocal, _strict, _negate});
    }
  };

  return makeWrapper({
    method: _method,
    methodName,
    reciprocal,
    strict,
    negate,
  });
}

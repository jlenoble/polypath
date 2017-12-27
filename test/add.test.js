/* eslint-disable no-invalid-this */
import {expect} from 'chai';

import {add} from '../src/methods';

import Chunk from '../src/chunk';
import Chunks from '../src/chunks';

import Muter, {muted} from 'muter';
// import Muter, {captured as muted} from 'muter';

const muter = Muter(console);

describe(`'add' function`, function () {
  describe(`provides a type with an 'add' property that`, function () {
    beforeEach(function () {
      class Type1 extends Chunk {};
      class Type3 extends Chunks {};

      this.Type1 = Type1;
      this.Type3 = Type3;

      add(Type1, Type1, function (obj) {
        return new Type3(this.chunk + ',' + obj.chunk);
      });
    });

    it('is a function', function () {
      const {Type1} = this;

      const t1 = new Type1('a');
      const t2 = new Type1('b');

      expect(t1.add).to.be.instanceof(Function);
      expect(() => t1.add(t2)).not.to.throw();
    });

    it('returns the expected type', function () {
      const {Type1, Type3} = this;

      const t1 = new Type1('a');
      const t2 = new Type1('b');

      expect(t1.add(t2)).to.be.instanceof(Type3);
    });

    it('throws on unexpected type', muted(muter, function () {
      const {Type1} = this;

      const t1 = new Type1('a');
      const t2 = 'b';

      expect(() => t1.add(t2)).to.throw('Type1 cannot add with String');
    }));
  });

  describe(`when run twice`, function () {
    beforeEach(function () {
      class Type1 extends Chunk {};
      class Type2 extends Chunk {};
      class Type3 extends Chunks {};

      this.Type1 = Type1;
      this.Type2 = Type2;
      this.Type3 = Type3;

      add(Type1, Type2, function (obj) {
        return new Type3(this.chunk + ',' + obj.chunk);
      });

      const p2 = Type2.prototype;
      const p3 = Type3.prototype;

      const storeT1OnP2 = `type:${Type1.name}`;
      const storeT1OnP3 = storeT1OnP2;
      const storeT3OnP2 = `type:${Type3.name}`;
      const addT2ToT1 = `add:${Type2.name}`;
      const addT3ToT1 = `add:${Type3.name}`;
      const addT2ToT3 = addT2ToT1;

      const index = (sym1, symName2) => () => {
        const symbs = Object.getOwnPropertySymbols(sym1);
        return symbs.map(s => s.toString()).indexOf(
          Symbol(symName2).toString());
      };

      this.indexStoreT1OnP2 = index(p2, storeT1OnP2);
      this.indexStoreT1OnP3 = index(p3, storeT1OnP3);
      this.indexStoreT3OnP2 = index(p2, storeT3OnP2);
      this.indexAddT2ToT1 = index(Type1, addT2ToT1);
      this.indexAddT3ToT1 = index(Type1, addT3ToT1);
      this.indexAddT2ToT3 = index(Type3, addT2ToT3);

      const length = obj => () => {
        return Object.getOwnPropertySymbols(obj).length;
      };

      this.lengthStoreOnP2 = length(p2);
      this.lengthStoreOnP3 = length(p3);
      this.lengthStoreOnT1 = length(Type1);
      this.lengthStoreOnT3 = length(Type3);
    });

    it('is ok if 2nd type is different from before', function () {
      expect(this.indexStoreT1OnP2()).to.equal(0);
      expect(this.indexStoreT1OnP3()).to.equal(-1);
      expect(this.indexStoreT3OnP2()).to.equal(-1);
      expect(this.indexAddT2ToT1()).to.equal(0);
      expect(this.indexAddT3ToT1()).to.equal(-1);
      expect(this.indexAddT2ToT3()).to.equal(-1);

      expect(this.lengthStoreOnP2()).to.equal(1);
      expect(this.lengthStoreOnP3()).to.equal(0);
      expect(this.lengthStoreOnT1()).to.equal(1);
      expect(this.lengthStoreOnT3()).to.equal(0);

      add(this.Type1, this.Type3, function () {});

      expect(this.indexStoreT1OnP2()).to.equal(0);
      expect(this.indexStoreT1OnP3()).to.equal(0);
      expect(this.indexStoreT3OnP2()).to.equal(-1);
      expect(this.indexAddT2ToT1()).to.equal(0);
      expect(this.indexAddT3ToT1()).to.equal(1);
      expect(this.indexAddT2ToT3()).to.equal(-1);

      expect(this.lengthStoreOnP2()).to.equal(1);
      expect(this.lengthStoreOnP3()).to.equal(1);
      expect(this.lengthStoreOnT1()).to.equal(2);
      expect(this.lengthStoreOnT3()).to.equal(0);
    });

    it('is ok if 1st type is different from before', function () {
      expect(this.indexStoreT1OnP2()).to.equal(0);
      expect(this.indexStoreT1OnP3()).to.equal(-1);
      expect(this.indexStoreT3OnP2()).to.equal(-1);
      expect(this.indexAddT2ToT1()).to.equal(0);
      expect(this.indexAddT3ToT1()).to.equal(-1);
      expect(this.indexAddT2ToT3()).to.equal(-1);

      expect(this.lengthStoreOnP2()).to.equal(1);
      expect(this.lengthStoreOnP3()).to.equal(0);
      expect(this.lengthStoreOnT1()).to.equal(1);
      expect(this.lengthStoreOnT3()).to.equal(0);

      add(this.Type3, this.Type2, function () {});

      expect(this.indexStoreT1OnP2()).to.equal(0);
      expect(this.indexStoreT1OnP3()).to.equal(-1);
      expect(this.indexStoreT3OnP2()).to.equal(1);
      expect(this.indexAddT2ToT1()).to.equal(0);
      expect(this.indexAddT3ToT1()).to.equal(-1);
      expect(this.indexAddT2ToT3()).to.equal(0);

      expect(this.lengthStoreOnP2()).to.equal(2);
      expect(this.lengthStoreOnP3()).to.equal(0);
      expect(this.lengthStoreOnT1()).to.equal(1);
      expect(this.lengthStoreOnT3()).to.equal(1);
    });

    it('throws if both types are the same as before', muted(muter, function () {
      expect(() => add(this.Type1, this.Type2, function () {}))
        .to.throw('Both types are already coupled');
    }));

    it('throws if 1st type is different but with same name as before',
      muted(muter, function () {
        function Type1 () {};

        expect(() => add(Type1, this.Type2, function () {}))
          .to.throw(`Symbols share name, but are different`);
      }));

    it('throws if 2nd type is different but with same name as before',
      muted(muter, function () {
        function Type2 () {};

        expect(() => add(this.Type1, Type2, function () {}))
          .to.throw('Type1::add(Type2) already implemented');
      }));
  });
});

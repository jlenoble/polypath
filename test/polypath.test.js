import Muter, {captured} from 'muter';
import {expect} from 'chai';
import Polypath from '../src/polypath';

describe('Testing Polypath', function () {
  const muter = Muter(console, 'log'); // eslint-disable-line new-cap

  it(`Class Polypath says 'Hello world!'`, captured(muter, function () {
    new Polypath();
    expect(muter.getLogs()).to.equal('Hello world!\n');
  }));
});

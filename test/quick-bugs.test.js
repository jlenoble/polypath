import {expect} from 'chai';
import path from 'path';
import PolyPath, {reduceGlob} from '../src/polypath';

describe('Testing PolyPath', function () {
  const polypaths = {
    'a': 'a',
    '!a': '',
    'a,b': 'a,b',
    'b,a': 'a,b',
    'a,!b': 'a',
    'b,!a': 'b',
    'a,!a': '',
    'a,!a,a': 'a',
    'a,!a,a,!a': '',
    '!a,a,!a': '',
    'a/b': 'a/b',
    'a/b/c': 'a/b/c',
    'a*': 'a*',
    'ab*,!abc': 'ab*,!abc',
    'ab*,!ab*': '',
    'a/*': 'a/*',
    'a/*/b': 'a/*/b',
    'a/**/ab': 'a/**/ab',
    'a/**/*': 'a/**/*',
    'a/*,b/*,c/*': 'a/*,b/*,c/*',
    'a/*,b/*,!c/*': 'a/*,b/*',
    'a/*,b/*,a/d': 'a/*,b/*',
    'a/*,b/*,!a/d': 'a/*,b/*,!a/d',
    'a/**/*,b/*,!a/d': 'a/**/*,b/*,!a/d',
    'a,b,!b,!c': 'a',
    'a,b,!c,!b,a,c': 'a,c',
    '*,a,b,!c': '*,!c',
    '*,!c,a,b': '*,!c',
    '*,!c,a,b,c': '*',
    'a,b,c,!b,**': '*',
    'a,b,c,!d,!e,!a,!z,r,t,!*,u': 'u',
    'a,b,c': 'a,b,c',
    'a,b,c,!d': 'a,b,c',
    'a,b,c,!d,!e': 'a,b,c',
    'a,b,c,!d,!e,**': '*',
    'a,b,c,!d,!e,**,!a': '*,!a',
    'a,b,c,!d,!e,**,!a,!z': '*,!a,!z',
    'a,b,c,!d,!e,**,!a,!z,r': '*,!a,!z',
    'a,b,c,!d,!e,**,!a,!z,r,t': '*,!a,!z',
    'a,b,c,!d,!e,**,!a,!z,r,t,!*': '',
    'a,b,c,!d,!e,**,!a,!z,r,t,!*,u': 'u',
    'a,b,c,!d,!e,**,!a,!z,r,t,!*,u,*': '*',
    '**,!*,*': '*',
    '**/*,!*,*': '**/*',
    '**,*,!*': '',
    '**/*,*,!*': '**/*,!*',
    '**,!*a,*a': '*',
    '**,*a,!*a': '*,!*a',
    '**,!*a,*b': '*,!*a,*b',
    '!*': '',
    'a/b/c/*,!d/b/c/*': 'a/b/c/*',
  };

  Object.keys(polypaths).forEach(key => {
    const paths0 = key.split(',');
    const paths = polypaths[key].split(',');
    const abspaths = paths.map(p => p[0] === '!' ?
      '!' + path.join(process.cwd(), p.substring(1)) :
      path.join(process.cwd(), p));

    it(`${JSON.stringify(paths0)} yields ${JSON.stringify(paths)}`,
      function () {
        const poly = new PolyPath(...paths0);
        const relPaths = poly.relative(process.cwd());

        expect(relPaths).to.eql(paths);
        expect(reduceGlob(...paths0)).to.eql(abspaths);
        expect(reduceGlob(...paths)).to.eql(abspaths);
        expect(poly).to.equal(new PolyPath(...paths)); // :)!
      });
  });
});

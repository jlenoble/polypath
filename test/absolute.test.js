import {expect} from 'chai';
import Absolute from '../src/absolute';

describe('Testing Absolute', function () {
  const doCover = {
    'src/path.js': [
      'src/path.js', 'src/*path.js', 'src/*.js', 'src/**/*.js',
      '*/path.js', '**/path.js', '**/*path.js',
    ],
    'src/*path.js': [
      'src/*path.js', 'src/*.js', 'src/**/*.js', '**/*path.js',
    ],
    'src/*.js': [
      'src/*.js', 'src/**/*.js',
    ],
    'src/**/*.js': [
      'src/**/*.js',
    ],
    '*/path.js': [
      '*/path.js', '**/path.js', '**/*path.js',
    ],
    '**/path.js': [
      '*/path.js', '**/path.js', '**/*path.js',
    ],
    '**/*path.js': [
      '**/*path.js',
    ],
  };

  Object.keys(doCover).forEach(key => {
    doCover[key].forEach(p => {
      it(`${JSON.stringify(key)} is covered by ${JSON.stringify(p)}`,
        function () {
          const abs = new Absolute(key);
          expect(abs.isCoveredBy(p)).to.be.true;
        });

      it(`${JSON.stringify(key)} is covered by ${JSON.stringify([p])}`,
        function () {
          const abs = new Absolute(key);
          expect(abs.isCoveredBy([p])).to.be.true;
        });
    });
  });

  Object.keys(doCover).forEach(key => {
    doCover[key].forEach(p => {
      it(`${JSON.stringify([key])} is covered by ${JSON.stringify(p)}`,
        function () {
          const abs = new Absolute([key]);
          expect(abs.isCoveredBy(p)).to.be.true;
        });

      it(`${JSON.stringify([key])} is covered by ${JSON.stringify([p])}`,
        function () {
          const abs = new Absolute([key]);
          expect(abs.isCoveredBy([p])).to.be.true;
        });
    });
  });

  const dontCover = {
    'src/*path.js': [
      'src/path.js',
      '*/path.js', '**/path.js',
    ],
    'src/*.js': [
      'src/path.js', 'src/*path.js',
      '*/path.js', '**/path.js', '**/*path.js',
    ],
    'src/**/*.js': [
      'src/path.js', 'src/*path.js', 'src/*.js',
      '*/path.js', '**/path.js', '**/*path.js',
    ],
    '*/path.js': [
      'src/path.js', 'src/*path.js', 'src/*.js', 'src/**/*.js',
    ],
    '**/path.js': [
      'src/path.js', 'src/*path.js', 'src/*.js', 'src/**/*.js',
    ],
    '**/*path.js': [
      'src/path.js', 'src/*path.js', 'src/*.js', 'src/**/*.js',
      '*/path.js', '**/path.js',
    ],
  };

  Object.keys(dontCover).forEach(key => {
    dontCover[key].forEach(p => {
      it(`${JSON.stringify(key)} is not covered by ${JSON.stringify(p)}`,
        function () {
          const abs = new Absolute(key);
          expect(abs.isCoveredBy(p)).to.be.false;
        });

      it(`${JSON.stringify(key)} is not covered by ${JSON.stringify([p])}`,
        function () {
          const abs = new Absolute(key);
          expect(abs.isCoveredBy([p])).to.be.false;
        });
    });
  });

  Object.keys(dontCover).forEach(key => {
    dontCover[key].forEach(p => {
      it(`${JSON.stringify([key])} is not covered by ${JSON.stringify(p)}`,
        function () {
          const abs = new Absolute([key]);
          expect(abs.isCoveredBy(p)).to.be.false;
        });

      it(`${JSON.stringify([key])} is not covered by ${JSON.stringify([p])}`,
        function () {
          const abs = new Absolute([key]);
          expect(abs.isCoveredBy([p])).to.be.false;
        });
    });
  });
});

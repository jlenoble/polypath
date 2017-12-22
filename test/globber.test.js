import {expect} from 'chai';
import path from 'path';
import Globber from '../src/globber';

describe('Testing Globber', function () {
  const cwd = process.cwd();

  it(`Globber separates negated globs`, function () {
    const glb = new Globber('src/*.js', 'test/*.js', '!src/globber.js');

    expect(glb.glob).to.eql([
      path.join(cwd, 'src/*.js'), path.join(cwd, 'test/*.js'),
      '!' + path.join(cwd, 'src/globber.js'),
    ]);
  });

  describe(`Globber merges redundant globs`, function () {
    it(`'src/*.js' add 'src/globber.js'`, function () {
      const glb = new Globber('src/*.js');
      glb.add('src/globber.js');
      expect(glb.glob).to.eql([path.join(cwd, 'src/*.js')]);
    });

    it(`'src/globber.js', 'src/path.js' add 'src/*.js'`, function () {
      const glb = new Globber('src/globber.js', 'src/path.js');
      glb.add('src/*.js');
      expect(glb.glob).to.eql([path.join(cwd, 'src/*.js')]);
    });

    it(`'src/**/*.js' add 'src/globber.js'`, function () {
      const glb = new Globber('src/**/*.js');
      glb.add('src/globber.js');
      expect(glb.glob).to.eql([path.join(cwd, 'src/**/*.js')]);
    });

    it(`'src/globber.js', 'src/path.js' add 'src/**/*.js'`, function () {
      const glb = new Globber('src/globber.js', 'src/path.js');
      glb.add('src/**/*.js');
      expect(glb.glob).to.eql([path.join(cwd, 'src/**/*.js')]);
    });

    it(`'src/**/*.js' add 'src/*js'`, function () {
      const glb = new Globber('src/**/*.js');
      glb.add('src/*.js');
      expect(glb.glob).to.eql([path.join(cwd, 'src/**/*.js')]);
    });

    it(`'src/*.js' add 'src/**/*js'`, function () {
      const glb = new Globber('src/*.js');
      glb.add('src/**/*.js');
      expect(glb.glob).to.eql([path.join(cwd, 'src/**/*.js')]);
    });

    it(`'a/b/**/f/g/*.js' add 'a/b/c/**/e/f/g/*.js'`, function () {
      const glb = new Globber('a/b/**/f/g/*.js');
      glb.add('a/b/c/**/e/f/g/*.js');
      expect(glb.glob).to.eql([path.join(cwd, 'a/b/**/f/g/*.js')]);
    });

    it(`'a/b/c/**/e/f/g/*.js' add 'a/b/**/f/g/*.js'`, function () {
      const glb = new Globber('a/b/c/**/e/f/g/*.js');
      glb.add('a/b/**/f/g/*.js');
      expect(glb.glob).to.eql([path.join(cwd, 'a/b/**/f/g/*.js')]);
    });
  });

  describe(`Globber trims negated globs`, function () {
    it(`'src/*.js' add '!src/globber.js' twice`, function () {
      const glb = new Globber('src/*.js');
      glb.add('!src/globber.js');
      expect(glb.glob).to.eql([
        path.join(cwd, 'src/*.js'),
        '!' + path.join(cwd, 'src/globber.js'),
      ]);
      glb.add('!src/globber.js');
      expect(glb.glob).to.eql([
        path.join(cwd, 'src/*.js'),
        '!' + path.join(cwd, 'src/globber.js'),
      ]);
    });

    it(`'src/path.js', 'src/globber.js' add '!src/path.js'`, function () {
      const glb = new Globber('src/path.js', 'src/globber.js');
      glb.add('!src/path.js');
      expect(glb.glob).to.eql([path.join(cwd, 'src/globber.js')]);
    });

    it(`'src/*.js' add '!src/*.js'`, function () {
      const glb = new Globber('src/*.js');
      glb.add('!src/*.js');
      expect(glb.glob).to.eql(['']);
    });

    it(`'src/*.js' add '!src/*.js', 'src/*.js'`, function () {
      const glb = new Globber('src/*.js');
      glb.add('!src/*.js');
      glb.add('src/*.js');
      expect(glb.glob).to.eql([path.join(cwd, 'src/*.js')]);
    });

    it(`'src/**/*.js' add '!src/*.js', 'src/path.js`, function () {
      const glb = new Globber('src/**/*.js');
      glb.add('!src/*.js');
      glb.add('src/path.js');
      expect(glb.glob).to.eql([
        path.join(cwd, 'src/**/*.js'),
        '!' + path.join(cwd, 'src/*.js'),
        path.join(cwd, 'src/path.js'),
      ]);
    });

    it(`'f1', 'f2', 'g1' add '!*1', 'g2'`, function () {
      const glb = new Globber('f1', 'f2', 'g1');
      glb.add('!*1');
      expect(glb.glob).to.eql([
        path.join(cwd, 'f2'),
      ]);
      glb.add('g2');
      expect(glb.glob).to.eql([
        path.join(cwd, 'f2'),
        path.join(cwd, 'g2'),
      ]);
    });

    it(`'f1', 'g*' add '!*1', '*'`, function () {
      const glb = new Globber('f1', 'g*');
      glb.add('!*1');
      expect(glb.glob).to.eql([
        path.join(cwd, 'g*'),
        '!' + path.join(cwd, '*1'),
      ]);
      glb.add('*');
      expect(glb.glob).to.eql([
        path.join(cwd, '*'),
      ]);
    });
  });
});

import {expect} from 'chai';
import path from 'path';
import Path from '../src/path';
import PolyPath from '../src/polypath';

describe('Testing Path', function () {
  it(`Testing relative method`, function () {
    const cwd = process.cwd();
    const p1 = new Path(path.join(cwd, 'src'));
    const p2 = new Path(path.join(cwd, 'test'));

    expect(p1.relative()).to.equal('src');
    expect(p2.relative()).to.equal('test');

    expect(p1.relative('src')).to.equal('');
    expect(p2.relative('src')).to.equal('../test');

    expect(p1.relative(p2)).to.equal('../src');
    expect(p2.relative(p2)).to.equal('');
  });
});

describe('Testing PolyPath', function () {
  it(`Testing relative method`, function () {
    const cwd = process.cwd();
    const p1 = new PolyPath(
      path.join(cwd, 'src'),
      path.join(cwd, 'test'),
      path.join(cwd, 'gulp')
    );
    const p2 = new PolyPath(
      path.join(cwd, 'gulp'),
      path.join(cwd, 'test'),
      path.join(cwd, 'src')
    );

    expect(p1.relative()).to.eql(['gulp', 'src', 'test']);
    expect(p2.relative()).to.eql(['gulp', 'src', 'test']);

    expect(p1.relative(p1.get('gulp'))).to.eql(['', '../src', '../test']);
    expect(p2.relative(p1.get('gulp'))).to.eql(['', '../src', '../test']);

    expect(p1.relative(p1.get('test'))).to.eql(['../gulp', '../src', '']);
    expect(p2.relative(p1.get('test'))).to.eql(['../gulp', '../src', '']);
  });

  it(`Testing relative method - negation`, function () {
    const cwd = process.cwd();
    const p1 = new PolyPath(
      path.join(cwd, 'src/*.js'),
      path.join(cwd, 'test/*.js'),
      '!' + path.join(cwd, 'gulp/*.js')
    );
    const p2 = new PolyPath(
      path.join(cwd, 'test/*.js'),
      path.join(cwd, 'src/*.js'),
      '!' + path.join(cwd, 'gulp/*.js'),
    );

    expect(p1.relative()).to.eql(['src/*.js', 'test/*.js']);
    expect(p2.relative()).to.eql(['src/*.js', 'test/*.js']);

    expect(p1.relative(p1.get('gulp'))).to.eql(
      ['../src/*.js', '../test/*.js']);
    expect(p2.relative(p1.get('gulp'))).to.eql(
      ['../src/*.js', '../test/*.js']);

    expect(p1.relative(p1.get('test'))).to.eql(
      ['../src/*.js', '*.js']);
    expect(p2.relative(p1.get('test'))).to.eql(
      ['../src/*.js', '*.js']);
  });

  it(`Testing relative method - negation - dir pattern`, function () {
    const cwd = process.cwd();
    const p1 = new PolyPath(
      path.join(cwd, 'src'),
      path.join(cwd, 'test'),
      '!' + path.join(cwd, 'gulp')
    );
    const p2 = new PolyPath(
      path.join(cwd, 'test'),
      path.join(cwd, 'src'),
      '!' + path.join(cwd, 'gulp'),
    );

    expect(p1.relative()).to.eql(['src', 'test']);
    expect(p2.relative()).to.eql(['src', 'test']);

    expect(p1.relative(p1.get('gulp'))).to.eql(['../src', '../test']);
    expect(p2.relative(p1.get('gulp'))).to.eql(['../src', '../test']);

    expect(p1.relative(p1.get('test'))).to.eql(['../src', '']);
    expect(p2.relative(p1.get('test'))).to.eql(['../src', '']);
  });
});

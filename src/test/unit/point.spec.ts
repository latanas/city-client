/*
  Project: Arena game
  Author:  Copyright (C) 2024, Atanas Laskov

  License: BSD license, see LICENSE.md for more details.

  http://www.atanaslaskov.com/city/
*/

import './utils.ts';
import { Point } from '../../game/point';

describe("Vector", () => {
  it("should construct a new vector", () => {
    let v:Point = new Point(0.1, 0.2);

    expect(v.x).toEqual(0.1);
    expect(v.y).toEqual(0.2);
  });

  it("should make a copy of itself", () => {
    let v1:Point = new Point(0.3, 0.4);
    let v2:Point = v1.copy();

    expect(v2).not.toBe(v1); // It should be a new instance
    expect(v2.x).toEqual(0.3);
    expect(v2.y).toEqual(0.4)
  });

  it("should set the coordinates of the vector", () => {
    let v1:Point = new Point(0.1, 0.2);
    let v2:Point = new Point(0.3, 0.4);

    v2.set( v1 );

    expect(v2.x).toEqual(0.1);
    expect(v2.y).toEqual(0.2);
  });

  it("should calculate 2D distance", () => {
    let v = new Point(0.0, 0.0);
    expect( v.distance() ).toEqual(0.0);

    v = new Point(1.0, 0.0);
    expect( v.distance() ).toEqual(1.0);

    v = new Point(0.0, 1.0);
    expect( v.distance() ).toEqual(1.0);

    v = new Point(10.0, 0.0);
    expect( v.distance() ).toEqual( 10.0 );

    v = new Point(0.0, 0.10);
    expect( v.distance() ).toEqual( 0.10 );

    v = new Point(1.0, 1.0);
    expect( limitPrecision(v.distance()) ).toEqual( 1.414 );

    v = new Point(-1.0, 1.0);
    expect( limitPrecision(v.distance()) ).toEqual( 1.414 );

    v = new Point(1.0, -1.0);
    expect( limitPrecision(v.distance()) ).toEqual( 1.414 );

    v = new Point(5.0, 10.0);
    expect( limitPrecision(v.distance()) ).toEqual( 11.180 );

    v = new Point(0.5, 1.0);
    expect( limitPrecision(v.distance()) ).toEqual( 1.118 );
  });

  it("should add two vectors", () => {
    let v = Point.plus( new Point(0.0, 0.0), new Point(0.0, 0.0) );
    expect( limitPrecision(v.x) ).toEqual( 0.0 );
    expect( limitPrecision(v.y) ).toEqual( 0.0 );

    v = Point.plus( new Point(1.0, 0.0), new Point(0.0, 1.0) );
    expect( limitPrecision(v.x) ).toEqual( 1.0 );
    expect( limitPrecision(v.y) ).toEqual( 1.0 );

    v = Point.plus( new Point(1.0, 2.0), new Point(3.0, 4.0) );
    expect( limitPrecision(v.x) ).toEqual( 4.0 );
    expect( limitPrecision(v.y) ).toEqual( 6.0 );
  });

  it("should substract two vectors", () => {
    let v = Point.minus( new Point(0.0, 0.0), new Point(0.0, 0.0) );
    expect( limitPrecision(v.x) ).toEqual( 0.0 );
    expect( limitPrecision(v.y) ).toEqual( 0.0 );

    v = Point.minus( new Point(1.0, 0.0), new Point(0.0, 1.0) );
    expect( limitPrecision(v.x) ).toEqual( 1.0 );
    expect( limitPrecision(v.y) ).toEqual( -1.0 );

    v = Point.minus( new Point(1.0, 2.0), new Point(3.0, 4.0) );
    expect( limitPrecision(v.x) ).toEqual( -2.0 );
    expect( limitPrecision(v.y) ).toEqual( -2.0 );
  });

  it("should scale a vecor by constant multiplier", () => {
    let v = Point.scale( new Point(0.0, 0.0), 10 );
    expect( limitPrecision(v.x) ).toEqual( 0.0 );
    expect( limitPrecision(v.y) ).toEqual( 0.0 );

    v = Point.scale( new Point(1.0, 1.0), 0 );
    expect( limitPrecision(v.x) ).toEqual( 0.0 );
    expect( limitPrecision(v.y) ).toEqual( 0.0 );

    v = Point.scale( new Point(1.0, 0.0), 10 );
    expect( limitPrecision(v.x) ).toEqual( 10.0 );
    expect( limitPrecision(v.y) ).toEqual( 0.0 );

    v = Point.scale( new Point(0.0, 1.0), 10 );
    expect( limitPrecision(v.x) ).toEqual( 0.0 );
    expect( limitPrecision(v.y) ).toEqual( 10.0 );

    v = Point.scale( new Point(1.0, 2.0), 10 );
    expect( limitPrecision(v.x) ).toEqual( 10.0 );
    expect( limitPrecision(v.y) ).toEqual( 20.0 );

    v = Point.scale( new Point(1.0, 2.0), 0.1 );
    expect( limitPrecision(v.x) ).toEqual( 0.1 );
    expect( limitPrecision(v.y) ).toEqual( 0.2 );

    v = Point.scale( new Point(1.0, 2.0), -0.1 );
    expect( limitPrecision(v.x) ).toEqual( -0.1 );
    expect( limitPrecision(v.y) ).toEqual( -0.2 );

    v = Point.scale( new Point(-1.0, -2.0), -0.1 );
    expect( limitPrecision(v.x) ).toEqual( 0.1 );
    expect( limitPrecision(v.y) ).toEqual( 0.2 );
  });

  it("should normalize vector", () => {
    let v = Point.norm( new Point(2.0, 0.0) );
    expect( v.x ).toBeCloseTo( 1.0, 3 );
    expect( v.y ).toBeCloseTo( 0.0, 3 );

    v = Point.norm( new Point(0.0, 2.0) );
    expect( v.x ).toBeCloseTo( 0.0, 3 );
    expect( v.y ).toBeCloseTo( 1.0, 3 );

    v = Point.norm( new Point(-0.5, +1.2) );
    var d = v.distance();
    expect( v.distance() ).toBeCloseTo( 1.0, 3 );
  });

  it("should convert vector to angle", () => {
    let v = new Point(1.0, 0.0);
    expect( v.angle() ).toBeCloseTo( 0.0, 3 );

    v = new Point(0.0, 1.0);
    expect( v.angle() ).toBeCloseTo( Math.PI*0.5, 3 );

    v = new Point( Math.cos(Math.PI*0.2), Math.sin(Math.PI*0.2) );
    expect( v.angle() ).toBeCloseTo( Math.PI*0.2, 3 );

    v = new Point( Math.cos(Math.PI*0.6), Math.sin(Math.PI*0.6) );
    expect( v.angle() ).toBeCloseTo( Math.PI*0.6, 3 );

    v = new Point( Math.cos(Math.PI*1.2), Math.sin(Math.PI*1.2) );
    expect( v.angle() ).toBeCloseTo( Math.PI*1.2 - 2.0*Math.PI, 3 );
  });
});

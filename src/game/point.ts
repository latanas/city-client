/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/

// This class represents a 2D point
//
export class Point {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public set(v: Point) {
        this.x = v.x;
        this.y = v.y;
    }

    public copy(): Point {
        return new Point(this.x, this.y);
    }

    public distance(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public angle(): number {
        return Math.atan2(this.y, this.x);
    }

    static plus(a: Point, b: Point): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }

    static minus(a: Point, b: Point): Point {
        return new Point(a.x - b.x, a.y - b.y);
    }

    static scale(v: Point, n: number) {
        return new Point(v.x * n, v.y * n);
    }

    static norm(v: Point) {
        var d: number = v.distance();
        return new Point(v.x / d, v.y / d);
    }

    static clamp(pt: Point, min: Point, max: Point): Point {
        let clamped = new Point();

        clamped.x = Math.min(Math.max(pt.x, min.x), max.x);
        clamped.y = Math.min(Math.max(pt.y, min.y), max.y);

        return clamped;
    };

    static getCenteredPosition(center: Point, size: Point) {
        return Point.plus(center, new Point(
          -1*(size.x/2),
          -1*(size.y/2)));
    }

    public getPixelsX(): string { return this.x.toString() + "px"; }
    public getPixelsY(): string { return this.y.toString() + "px"; }
}
/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/

import { Point } from "./point";


// 2D bounding rectangle represented with the Top-Left and Bottom-Right points
//
export class Rect {
    private pt: Point[] = [];

    constructor(pt1: Point = new Point(), pt2: Point = new Point()) {
        this.pt.push(new Point( Math.min(pt1.x, pt2.x), Math.min(pt1.y, pt2.y) ));
        this.pt.push(new Point( Math.max(pt1.x, pt2.x), Math.max(pt1.y, pt2.y) ));
    }

    getTopLeft(): Point {
        return this.pt[0];
    }

    getBottomRight(): Point {
        return this.pt[1];
    }

    isIntersectingRect(r: Rect): boolean {
        if (r.pt[0].x > this.pt[1].x) return false;
        if (this.pt[0].x > r.pt[1].x) return false;

        if (r.pt[0].y > this.pt[1].y) return false;
        if (this.pt[0].y > r.pt[1].y) return false;

        return true;
    }

    isIntersectingPoint(p: Point): boolean {
        if (p.x > this.pt[1].x) return false;
        if (this.pt[0].x > p.x) return false;

        if (p.y > this.pt[1].y) return false;
        if (this.pt[0].y > p.y) return false;

        return true;
    }

    static translate(rect: Rect, offset: Point): Rect {
        return new Rect(Point.plus(rect.pt[0], offset), Point.plus(rect.pt[1], offset));
    }
}

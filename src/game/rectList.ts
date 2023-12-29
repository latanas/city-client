/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/

import { Point } from "./point";
import { Rect } from "./rect";


// List of rectangles that can be used for bounding area checks
//
export class RectList {
    public rects: Rect[];

    constructor(rects: Rect[] = []) {
        this.rects = rects;
    }

    isIntersectingRectList(rl: RectList): boolean {
        for(let r1 of this.rects) {
            for(let r2 of rl.rects) {
                if( r1.isIntersectingRect(r2)) return true;
            }
        }
        return false;
    }

    isIntersectingRect(r: Rect): boolean {
        for(let r1 of this.rects) {
            if(r1.isIntersectingRect(r)) return true;
        }
        return true;
    }

    isIntersectingPoint(p: Point): boolean {
        for(let r1 of this.rects) {
            if(r1.isIntersectingPoint(p)) return true;
        }
        return true;
    }
}
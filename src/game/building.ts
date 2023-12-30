/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Point } from "./point";
import { BuildingType } from "./building-type";
import { RectList } from "./rect-list";

// Single instance of a building placed in the city
//
export class Building {
    type: BuildingType;
    pos: Point;

    constructor(type: BuildingType = new BuildingType(), pos: Point = new Point()) {
        this.type = type;
        this.pos = pos;
    }

    getOccupiedArea(): RectList {
      return RectList.translate(this.type.occupiedArea, this.pos);
    }
}
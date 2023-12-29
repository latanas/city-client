/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { BuildingType } from "./buildingType";
import { Point } from "./point";

// Single instance of a building placed in the city
//
export class Building {
    type = new BuildingType("", "");
    pos = new Point();

    constructor(type: BuildingType, pos: Point) {
        this.type = type;
        this.pos = pos;
    }
}
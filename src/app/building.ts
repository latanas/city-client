import { BuildingType } from "./buildingType";
import { Point } from "./point";

export class Building {
    type = new BuildingType("", "");
    pos = new Point();

    constructor(type: BuildingType, pos: Point) {
        this.type = type;
        this.pos = pos;
    }
}
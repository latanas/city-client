
import { Point } from "./point";
import { Rect } from "./rect";
import { RectList } from "./rect-list";
import { BuildingType } from "./building-type";

// Specialized building type for placing the road elements
//
export class RoadBuildingType extends BuildingType {
    constructor(assetFolder: string) {
        super(
            "Road",
            assetFolder + "/RoadSprites.png",
            new Point(100, 100),
            new RectList([new Rect(new Point(0, 0), new Point(100, 100))])
        );
    }
}
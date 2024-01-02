
import { Point } from "./point";
import { Rect } from "./rect";
import { RectList } from "./rect-list";
import { BuildingType } from "./building-type";

// Specialized building type for the "Demolish" tool
//
export class DemolishBuildingType extends BuildingType {
    constructor(assetFolder: string) {
        super(
            "Demolish",
            assetFolder + "/Demolish.png",
            new Point(100, 100),
            new RectList([new Rect(new Point(0, 0), new Point(100, 100))])
        );
    }
}
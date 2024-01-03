
import { Point } from "./point";
import { Rect } from "./rect";
import { RectList } from "./rect-list";
import { BuildingType } from "./building-type";

// Specialized building type for placing the road elements
//
export class RoadBuildingType extends BuildingType {
    public static readonly RoadSpriteCount: number = 11;

    constructor(assetFolder: string) {
        super(
            "Road",
            assetFolder + "/RoadSprites.png",
            new Point(100, 100),
            new RectList([new Rect(new Point(0, 0), new Point(100, 100))])
        );
    }

    // Get the sprite shape depending on the context of 8 adjaicent road tiles
    // The context is a boolean matrix in the form:
    //
    // 0 0 0
    // 0 R 0
    // 0 0 0
    //
    public static getSpriteIndexForContext(context: boolean[][]) {
        // Starting with the cases with the most restrictive requirements
        // Circle requires 4 neighbouring roads
        if ( context[0][1] && context[1][0] && context[2][1] && context[1][2]) {
            return 10;
        }

        // T shaped road requires 3 neighboruing roads
        if ( context[0][1] && context[2][1] && context[1][2] ) {
            return 9;
        }

        if ( context[1][0] && context[1][2] && context[2][1] ) {
            return 8;
        }

        if ( context[0][1] && context[1][0] && context[2][1] ) {
            return 7;
        }

        if ( context[0][1] && context[1][0] && context[1][2] ) {
            return 6;
        }

        // L shaped only require two neighbouringh roads
        if ( context[0][1] && context[1][2] ) {
            return 5;
        }

        if ( context[2][1] && context[1][2] ) {
            return 4;
        }

        if ( context[1][0] && context[2][1] ) {
            return 3;
        }

        if ( context[0][1] && context[1][0] ) {
            return 2;
        }

        // | road
        if ( context[1][0] ) {
            return 1;
        }

        if (context[1][2] ) {
            return 1;
        }

        // -- road
        return 0;
    }
}
/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Point } from "./point";
import { Rect } from "./rect";
import { RectList } from "./rect-list";
import { BuildingType } from "./building-type";

// Building type scaled proportionately to the original asset image
//
export class ScaledImageBuildingType extends BuildingType {
    private static readonly assetScaleFactor: number = 0.4;

    constructor(name: string = "", imagePath: string = "", provisionalImageSize: Point = new Point(), occupiedArea: RectList = new RectList()) {
        super(name, imagePath, provisionalImageSize, occupiedArea);

        // Use provided placeholder image sizes until the asset is loaded
        if (imagePath != "") {
            const img = new Image();
            let sz = this.getSize();
            let sf = ScaledImageBuildingType.assetScaleFactor;

            img.onload = function () {
                if ((img.width > 0) && (img.height > 0)) {
                    sz.x = img.width * sf;
                    sz.y = sz.x * (img.height / img.width);

                    if (!occupiedArea.rects.length) {
                        occupiedArea.rects.push( new Rect(
                            new Point(0, sz.y * 0.5),
                            new Point(sz.x, sz.y),
                        ))
                    }
                }
            }
            img.src = imagePath;
        }
    }
}

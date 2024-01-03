/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Point } from "./point";
import { Rect } from "./rect";
import { RectList } from "./rect-list";

// Type of building which can be placed in a city
//
export class BuildingType {
    private assetScaleFactor: number = 0.4;

    private name = "";
    private imagePath = "";
    private imageSize = new Point();
    private occupiedArea = new RectList();
    
    constructor(name: string = "", imagePath: string = "", imageSize: Point = new Point(), occupiedArea: RectList = new RectList()) {
        this.name = name;
        this.imagePath = imagePath;
        this.imageSize = imageSize;
        this.occupiedArea = occupiedArea;

        // Use provided placeholder image sizes until the asset is loaded
        if (imagePath != "") {
            const img = new Image();
            let sz = this.imageSize;
            let sf = this.assetScaleFactor;

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

    getName(): string {
        return this.name;
    }

    getImagePath(): string {
        return this.imagePath;
    }

    getImageUrl(): string {
        return "url(" + this.imagePath + ")";
    }


    getImageSize(): Point {
        return this.imageSize;
    }

    getOccuptiedArea(): RectList {
        return this.occupiedArea;
    }
}
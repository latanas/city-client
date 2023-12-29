/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Point } from "./point";
import { RectList } from "./rect-list";

// Type of building which can be placed in a city
//
export class BuildingType {
    name = "";
    imagePath = new String;
    imageSize = new Point();
    occupiedArea = new RectList();
    
    constructor(name: string = "", imagePath: string = "", imageSize: Point = new Point(), occupiedArea: RectList = new RectList()) {
        this.name = name;
        this.imagePath = imagePath;
        this.imageSize = imageSize;
        this.occupiedArea = occupiedArea;

        // Use provided placeholder image sizes until the asset is loaded
        if (imagePath != "") {
            const img = new Image();
            let sz = this.imageSize;

            img.onload = function () {
                if ((img.width > 0) && (img.height > 0)) {
                    sz.x = img.width * 0.4;
                    sz.y = sz.x * (img.height / img.width);
                }
            }
            img.src = imagePath;
        }
    }
}
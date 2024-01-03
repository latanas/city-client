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
    private readonly name;
    private readonly imagePath;

    private size = new Point();
    private occupiedArea = new RectList();
    
    constructor(name: string = "", imagePath: string = "", size: Point = new Point(), occupiedArea: RectList = new RectList()) {
        this.name = name;
        this.imagePath = imagePath;

        this.size = size;
        this.occupiedArea = occupiedArea;
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

    getSize(): Point {
        return this.size;
    }

    getOccuptiedArea(): RectList {
        return this.occupiedArea;
    }
}
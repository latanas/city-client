import { Point } from "./point";

export class BuildingType {
    name = new String;
    imagePath = new String;
    imageSize = new Point();

    constructor(name: string = "", imagePath: string = "", imageSize: Point = new Point()) {
        this.name = name;
        this.imagePath = imagePath;
        this.imageSize = imageSize;
    }
}
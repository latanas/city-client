import { Point } from "./point";

export class BuildingType {
    name = new String;
    imagePath = new String;
    imageSize = new Point();

    constructor(name: string = "", imagePath: string = "", imageSize: Point = new Point()) {
        this.name = name;
        this.imagePath = imagePath;
        this.imageSize = imageSize;

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
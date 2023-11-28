export class Point {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public getPixelsX(): string { return this.x.toString() + "px"; }
    public getPixelsY(): string { return this.y.toString() + "px"; }

    public add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    /*public snapToGrid(gridSize: number): Point {
        pt = new Point();
        pt.x = 
    }*/
}
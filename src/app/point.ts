export class Point {
    public x: number = 0;
    public y: number = 0;

    public getPixelsX(): string { return this.x.toString() + "px"; }
    public getPixelsY(): string { return this.y.toString() + "px"; }
}
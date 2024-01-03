/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Point } from "./point";
import { Grid } from "./grid";
import { RectList } from "./rect-list";

import { Building } from "./building";
import { Road } from "./road";
import { RoadBuildingType } from "./road-building-type";



// Container for all the buildings in the city
// This class keeps them sorted in order of the Y coordinate, so  buildings that are "in front" will appear near the end of the list
//
export class City {
  private grid;

  private buildings: Building[] = [];
  private roads: Road[][] = [];

  constructor(grid: Grid) {
    this.grid = grid;
  }

  getBuildingsCopy(): Building[] {
    return this.buildings.slice();
  }

  getRoadsCopy(): Road[] {
    let r: Road[] = []

    for (let x: number = 0; x < this.roads.length; x++) {
      for (let y: number = 0; y < this.roads[x].length; y++) {
        if ( !this.roads[x][y].isEmptyType() ) {
          r.push(this.roads[x][y]);
        }
      }
    }
    return r;
  }

  getRoadSpriteIndex(road: Road): number {
    let gridIndex = this.grid.getGridIndex(road.getPos());
    //return gridIndex.x;

    let context = this._getRoadContextMatrix(gridIndex.x, gridIndex.y);
    return RoadBuildingType.getSpriteIndexForContext(context);
  }

  getRoadSpritePosition(road: Road) {
    //let fraction = 100.0 / (RoadBuildingType.RoadSpriteCount);
    //return this.getRoadSpriteIndex(road) * fraction;

    return -1 * this.getRoadSpriteIndex(road) * this.grid.getDimension().x;
  }

  // Check if a building's location overlaps already constructed area of the city
  //
  isPlaceable(newBuilding: Building) {
    for (let cityBuilding of this.buildings) {
      if( newBuilding.getOccupiedArea().isIntersectingRectList(cityBuilding.getOccupiedArea()) ) {
        return false;
      }
    }
    return true;
  }

  // Try to place a new building.
  // The city class can reject this if there are already other buildings at the building's location.
  //
  place(b: Building): boolean {
    if(b instanceof Road) {
      this._placeRoad(b);
      return true;
    }

    if (!this.isPlaceable(b)) {
      return false;
    }

    let bottomY = b.getPos().y + b.getType().getImageSize().y;
    let i = 0;

    while( (i < this.buildings.length) && (this.buildings[i].getPos().y + this.buildings[i].getType().getImageSize().y < bottomY) ) i++;

    if (i < this.buildings.length) {
      this.buildings.splice(i, 0, b);
    }
    else {
      this.buildings.push(b);
    }
    return true;
  }

  private _placeRoad(road: Road) {
    //let centerPt = road.getPos(); //Point.plus(road.getPos(), Point.scale(this.grid.getDimension(), 0.5));
    let index = this.grid.getGridIndex(road.getPos());
    let roadNetworkSize = this._getRoadMatrixSize();

    if (!this._isWithinBounds(index.x, index.y)) {
      let newRoads: Road[][] = [];

      let newSizeX = Math.max(index.x + 1, roadNetworkSize.x);
      let newSizeY = Math.max(index.y + 1, roadNetworkSize.y);

      console.log("Resizing road network to " + newSizeX + "x" + newSizeY);

        for(var x: number = 0; x < newSizeX; x++) {
          newRoads[x] = [];

          for(var y: number = 0; y < newSizeY; y++) {
            if (this._isWithinBounds(x,y)) {
              newRoads[x][y] = this.roads[x][y];
            }
            else {
              newRoads[x][y] = new Road();
            }
          }
      }
      this.roads = newRoads;
    }

    this.roads[index.x][index.y] = road;
    console.log(this.roads[index.x][index.y].getPos());
  }

  // Demolish an area of the city
  //
  demolish(area: RectList) {
    let newItems = new Array<Building>();

    for (let b of this.buildings) {
      if (!b.getOccupiedArea().isIntersectingRectList(area)) {
        newItems.push(b);
      }
    }
    this.buildings = newItems;
  }

  // Execute a function on each building
  //
  each(action: (obj: Building | null, id: number) => void) {
    for (var id = 0; id < this.buildings.length; id++) {
      action(this.buildings[id], id);
    }
  }

  private _getRoadMatrixSize = () => {
    if (this.roads.length == 0) {
      return new Point(0, 0);
    }
    return new Point(this.roads.length, this.roads[0].length);
  }

  private _isWithinBounds = (x: number, y: number) => {
    if ( (x < 0) || (y < 0)) return false;
    let sz: Point = this._getRoadMatrixSize();
    return (x < sz.x) && (y < sz.y);
  }

  private _getRoadContextMatrix(rx: number, ry: number): boolean[][] {
    let context: boolean[][] = [];

    for (let i: number = 0; i < 3; i++) {
      context[i] = [false, false, false];

      for (let j: number = 0; j < 3; j++) {
        let x = rx - 1 + i;
        let y = ry - 1 + j;

        if (this._isWithinBounds(x,y)) {
          context[i][j] = !this.roads[x][y].isEmptyType();
        }
      }
    }
    return context;
  }
}

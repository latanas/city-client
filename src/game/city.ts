/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Building } from "./building";
import { Point } from "./point";
import { Grid } from "./grid";
import { RectList } from "./rect-list";

// Container for all the buildings in the city
// This class keeps them sorted in order of the Y coordinate, so  buildings that are "in front" will appear near the end of the list
//
export class City {
  private items: Building[] = [];
  private grid: Grid = new Grid(new Point(100, 100));

  constructor() {
  }

  getBuildingsCopy(): Building[] {
    return this.items.slice();
  }

  isPlaceable(newBuilding: Building) {
    for (let cityBuilding of this.items) {
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
    if (!this.isPlaceable(b)) {
      return false;
    }
    let bottomY = b.pos.y + b.type.imageSize.y;
    let i = 0;

    while( (i < this.items.length) && (this.items[i].pos.y + this.items[i].type.imageSize.y < bottomY) ) i++;

    if (i < this.items.length) {
      this.items.splice(i, 0, b);
    }
    else {
      this.items.push(b);
    }
    // this.buildings.sort((a:Building, b:Building) => { return (a.pos.y + a.type.imageSize.y) - (b.pos.y + b.type.imageSize.y); }); 
    return true;
  }

  // Demolish an area of the city
  //
  demolish(area: RectList) {
    let newItems = new Array<Building>();

    for (let b of this.items) {
      if (!b.getOccupiedArea().isIntersectingRectList(area)) {
        newItems.push(b);
      }
    }
    this.items = newItems;
  }

  // Demolish a building
  // 
  /*demolish(pos: Point, area: number) {
    let newItems = new Array<Building>();

    for (let b of this.items) {
      if (b.pos.x + area > pos.x ||
        b.pos.y + area > pos.y ||
        b.pos.x + b.type.imageSize.x < pos.x - area ||
        b.pos.y + b.type.imageSize.y < pos.y - area) {
        newItems.push(b);
      }
    }

    this.items = newItems;
  }*/

  // Execute a function on each building
  //
  each(action: (obj: Building | null, id: number) => void) {
    for (var id = 0; id < this.items.length; id++) {
      action(this.items[id], id);
    }
  }
}

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



// Container for all the buildings in the city
// This class keeps them sorted in order of the Y coordinate, so  buildings that are "in front" will appear near the end of the list
//
export class City {
  private buildings: Building[] = [];
  private roads: Road[][] = [];
  
  private grid: Grid = new Grid(new Point(100, 100));

  constructor() {
  }

  getBuildingsCopy(): Building[] {
    return this.buildings.slice();
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
}

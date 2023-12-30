import { Component } from '@angular/core';

import { Point } from '../game/point';
import { BuildingType } from '../game/building-type';
import { Building } from '../game/building';

import { City } from 'src/game/city';

@Component({
  selector: 'app-root',
  //standalone: true,
  //imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host:{
    "(mousemove)": "onMouseMove($event)"
  }
})

export class AppComponent {
  title = 'City @ Atanas Laskov';
  city = new City();

  currentBuilding = new Building();
  mousePos = new Point();
  gizmoRadius = 150;

  public buildingTypeSelected(bt: BuildingType) {
    this.currentBuilding.type = bt;
    this.currentBuilding.pos = this.getMouseCenteredBuildingPos();
  }

  public placeBuilding() {
    //this.hoverOut();
    
    if( this.currentBuilding.type.name == "Demolish")   {
      this.city.demolish(this.mousePos, this.gizmoRadius);
      this.currentBuilding = new Building();
    }
    else if( this.currentBuilding.type.name != "")   {
      if( this.city.place( this.currentBuilding ) ) {
        this.currentBuilding = new Building();
      }
    }
    else {
      //this.hideSubMenu();
    }
  }

  onMouseMove(e: MouseEvent) {
    this.mousePos = new Point(e.clientX, e.clientY);
    this.currentBuilding.pos = this.getMouseCenteredBuildingPos();
  }

  getMouseCenteredPosition(size: Point): Point {
    return Point.getCenteredPosition(this.mousePos, size);
  }

  getMouseCenteredBuildingPos(): Point {
    return this.getMouseCenteredPosition(this.currentBuilding.type.imageSize);
  }

  getMouseCenteredGizmoPos(): Point {
    return this.getMouseCenteredPosition(new Point(this.gizmoRadius*2, this.gizmoRadius*2));
  }
}

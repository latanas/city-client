import { Component } from '@angular/core';

import { Point } from '../game/point';
import { BuildingType } from '../game/building-type';
import { DemolishBuildingType } from '../game/demolish-building-type';
import { Building } from '../game/building';

import { City } from 'src/game/city';

import { BuildingPaletteComponent } from './building-palette.component';

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
  currentBuildingTool = new Building();
  mousePos = new Point();
  gizmoRadius = 150;

  public buildingToolSelectedEvent(bt: BuildingType) {
    this.currentBuildingTool = new Building(bt);
    this.currentBuildingTool.setPos( this.getMouseCenteredBuildingPos() );
  }

  public placeBuilding(buildingPalette: BuildingPaletteComponent) {
    buildingPalette.hoverOut();
    
    if( this.isToolDemolish() )   {
      this.city.demolish(this.currentBuildingTool.getOccupiedArea());
      this.finishBuildingToolAction(buildingPalette);
    }
    else if( this.currentBuildingTool.getType().getName() != "")   {
      if( this.city.place( this.currentBuildingTool ) ) {
        this.finishBuildingToolAction(buildingPalette);
      }
    }
    else {
      buildingPalette.hideSubMenu();
      this.finishBuildingToolAction(buildingPalette);
    }
  }

  finishBuildingToolAction(buildingPalette: BuildingPaletteComponent) {
    this.currentBuildingTool = new Building();
    buildingPalette.finishToolAction();
  }

  isToolDemolish() {
    return this.currentBuildingTool.getType() instanceof DemolishBuildingType;
  }

  onMouseMove(e: MouseEvent) {
    this.mousePos = new Point(e.clientX, e.clientY);
    this.currentBuildingTool.setPos( this.getMouseCenteredBuildingPos() );
  }

  getMouseCenteredPosition(size: Point): Point {
    return Point.getCenteredPosition(this.mousePos, size);
  }

  getMouseCenteredBuildingPos(): Point {
    return this.getMouseCenteredPosition(this.currentBuildingTool.getType().getImageSize());
  }

  getMouseCenteredGizmoPos(): Point {
    return this.getMouseCenteredPosition(new Point(this.gizmoRadius*2, this.gizmoRadius*2));
  }
}

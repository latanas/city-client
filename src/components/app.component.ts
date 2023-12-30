import { Component } from '@angular/core';
import packageJson from '../../package.json';

import { Point } from '../game/point';
import { BuildingType } from '../game/building-type';
import { Building } from '../game/building';

import { City } from 'src/game/city';

import { BuildingPaletteComponent } from './building-palette.component';

@Component({
  selector: 'app-root',
  //standalone: true,
  //imports: [BuildingPaletteComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host:{
    "(mousemove)": "onMouseMove($event)"
  }
})

export class AppComponent {
  title = 'City @ Atanas Laskov';
  appVersion = packageJson.version;
  city = new City();
  
  mousePos = new Point();
  currentBuildingType = new BuildingType();

  public buildingTypeSelected(bt: BuildingType) {
    this.currentBuildingType = bt;
  }

  public placeBuilding() {
    //this.hoverOut();
    
    if( this.currentBuildingType.name == "Demolish")   {
      this.city.demolish(this.mousePos, 50);
      this.currentBuildingType = new BuildingType();
    }
    else if( this.currentBuildingType.name != "")   {
      let pos = Point.plus(this.mousePos, new Point(
        -1*(this.currentBuildingType.imageSize.x/2),
        -1*(this.currentBuildingType.imageSize.y/2)));

      if( this.city.place( new Building(this.currentBuildingType, pos)) ) {
        this.currentBuildingType = new BuildingType();
      }
    }
    else {
      //this.hideSubMenu();
    }
  }

  onMouseMove(e: MouseEvent) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  }

  public getMousePixelsX(): string {
    return Point.plus(this.mousePos, new Point(-100,-100) ).getPixelsX();
  }

  public getMousePixelsY(): string {
    return Point.plus(this.mousePos, new Point(-100,-100) ).getPixelsY();
  }

  
}

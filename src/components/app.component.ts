import { Component } from '@angular/core';
import packageJson from '../../package.json';

import { Point } from '../game/point';
import { BuildingType } from '../game/building-type';
import { Building } from '../game/building';

import { BuildingTypes } from 'src/game/building-type-factory';
import { BuildingTypeFactoryService } from '../services/building-type-factory.service';

import { City } from 'src/game/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host:{
    "(mousemove)": "onMouseMove($event)",
    "(document:keyup)": "onKeyUp($event)"
  }
})

export class AppComponent {
  title = 'City @ Atanas Laskov';
  appVersion = packageJson.version;
  appAssetFolder = "asset";

  buildingTypePalette: BuildingTypes;
  demolishBuildingType = new BuildingType("Demolish", this.appAssetFolder + "/Demolish.png", new Point(100, 100));

  city = new City();

  currentSubMenu = "";
  currentBuildingType = new BuildingType();
  hoverBuildingName = "";

  mousePos = new Point();

  constructor(btfService: BuildingTypeFactoryService) {
    this.buildingTypePalette = btfService.getBuildingTypeFactory().getBuildingTypes(this.appAssetFolder);
  }

  public showSubMenu(menuName: string) {
    if (this.currentSubMenu != menuName) {
      this.currentSubMenu = menuName;
    }
    else {
      this.hideSubMenu();
    }
    this.currentBuildingType = new BuildingType();
  }
  
  public hideSubMenu() {
    this.currentSubMenu = "";
  }

  public hoverBuilding(buildingType: BuildingType) {
    this.hoverBuildingName = buildingType.name;
  }

  public hoverOut() {
    this.hoverBuildingName = "";
  }

  public grabBuilding(buildingType: BuildingType) {
    this.hideSubMenu();
    this.hoverOut();

    if ((this.currentBuildingType.name != "") && (buildingType == this.demolishBuildingType)) {
      this.currentBuildingType = new BuildingType();
    }
    else {
      this.currentBuildingType = buildingType;
    }

  }

  public placeBuilding() {
    this.hoverOut();
    
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
      this.hideSubMenu();
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

  onKeyUp(e: KeyboardEvent) {
    //console.log(e);
    if( e.key == 'x' || e.key == 'X' || e.key == 'Escape') {
      this.hideSubMenu();
      this.currentBuildingType = new BuildingType();
    }
  }
}

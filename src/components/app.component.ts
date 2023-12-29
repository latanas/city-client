import { Component } from '@angular/core';
import packageJson from '../../package.json';

import { Point } from '../game/point';
import { BuildingType } from '../game/buildingType';
import { Building } from '../game/building';

import { BuildingTypeGroups } from 'src/game/buildingTypeFactory';
import { BuildingTypeFactory } from 'src/game/buildingTypeFactory';

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

  buildings = new Array<Building>;

  buildingSubMenus: BuildingTypeGroups = BuildingTypeFactory.getDefaultBuildingTypes(this.appAssetFolder);
  demolishBuildingType = new BuildingType("Demolish", this.appAssetFolder + "/Demolish.png", new Point(100, 100));

  currentSubMenu = "";
  currentBuildingType = new BuildingType();
  hoverBuildingName = "";

  mousePos = new Point();

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
      let newBuildings = new Array<Building>();

      for (let b of this.buildings) {
        if(b.pos.x + 50 > this.mousePos.x ||
          b.pos.y + 50 > this.mousePos.y ||
          b.pos.x + b.type.imageSize.x < this.mousePos.x - 50 ||
          b.pos.y + b.type.imageSize.y < this.mousePos.y - 50 ) {
            newBuildings.push(b);
          }
      }
      this.buildings = newBuildings;
      this.currentBuildingType = new BuildingType();
    }
    else if( this.currentBuildingType.name != "")   {
      let pos = Point.plus(this.mousePos, new Point(
        -1*(this.currentBuildingType.imageSize.x/2),
        -1*(this.currentBuildingType.imageSize.y/2)));

      this.buildings.push( new Building(this.currentBuildingType, pos) );
      this.buildings.sort((a:Building, b:Building) => { return (a.pos.y + a.type.imageSize.y) - (b.pos.y + b.type.imageSize.y); }); 
      this.currentBuildingType = new BuildingType();
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

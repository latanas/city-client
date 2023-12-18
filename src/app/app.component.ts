import { Component } from '@angular/core';
import { Point } from './point';
import { BuildingType } from './buildingType';
import { Building } from './building';
import packageJson from '../../package.json';

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

  buildingSubMenus = {
    "Housing" : [
      new BuildingType("Housing Block A", this.appAssetFolder + "/Housing01.png", new Point(150, 100)),
      new BuildingType("Housing Block B", this.appAssetFolder + "/Housing02.png", new Point(150, 100)),
      new BuildingType("Housing Block C", this.appAssetFolder + "/Housing04.png", new Point(100, 100)),
      new BuildingType("Tower House", this.appAssetFolder + "/Housing05.png", new Point(100, 100)),
      new BuildingType("Luxury Housing", this.appAssetFolder + "/Housing03.png", new Point(250, 100)),
      new BuildingType("Fancy High-Rise Housing", this.appAssetFolder + "/FancyHighRiseHousing.png", new Point(150, 100)),
    ],
    "Power": [
      new BuildingType("Coal Plant", this.appAssetFolder + "/CoalPlant.png", new Point(200, 100)),
      new BuildingType("Nuclear Plant", this.appAssetFolder + "/NuclearPlant.png", new Point(250, 100)),
    ],
    "Water": [
      new BuildingType("Docks", this.appAssetFolder + "/Docks.png", new Point(200, 100)),
      new BuildingType("Dock Administration", this.appAssetFolder + "/DocksAdministration.png", new Point(250, 100)),
      new BuildingType("Water Tower", this.appAssetFolder + "/WaterTower01.png", new Point(50, 100)),
      new BuildingType("Large Water Tower", this.appAssetFolder + "/WaterTower02.png", new Point(80, 100)),
    ],
    "Industry": [
      new BuildingType("Factory", this.appAssetFolder + "/Factory.png", new Point(180, 100)),
      new BuildingType("Workshop", this.appAssetFolder + "/Workshop.png", new Point(100, 100)),
      new BuildingType("Office Tower A", this.appAssetFolder + "/OfficeTower01.png", new Point(100, 100)),
      new BuildingType("Office Tower B", this.appAssetFolder + "/OfficeTower02.png", new Point(150, 100)),
      new BuildingType("Office Tower C", this.appAssetFolder + "/OfficeTower03.png", new Point(100, 100)),
    ],
    "Entertainment": [
      new BuildingType("Bar & Nightclub", this.appAssetFolder + "/BarNightclub.png", new Point(150, 100)),
      new BuildingType("Casino Hotel", this.appAssetFolder + "/CasinoHotel.png", new Point(250, 100)),
      new BuildingType("Shopping Mall Hotel", this.appAssetFolder + "/HotelAndMall01.png", new Point(200, 100)),
      new BuildingType("Sport Stadium", this.appAssetFolder + "/Stadium.png", new Point(300, 100)),
    ],
    "Education": [
      new BuildingType("Humanities College", this.appAssetFolder + "/UniversityOldCollege.png", new Point(150, 100)),
      new BuildingType("Science College", this.appAssetFolder + "/UniversityNewCollege.png", new Point(150, 100)),
      new BuildingType("Library", this.appAssetFolder + "/Library01.png", new Point(150, 100)),
    ],
    "Transport": [
      new BuildingType("Airport Tower", this.appAssetFolder + "/AirportControlTower.png", new Point(200, 100)),
      new BuildingType("Airport Terminal", this.appAssetFolder + "/AirportTerminal.png", new Point(300, 100)),
    ],
    "Parks": [
      new BuildingType("Graveyard Chapel", this.appAssetFolder + "/GraveyardChapel.png", new Point(250, 100)),
    ],
  };

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
      let pos = this.mousePos.add(new Point(
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
    return this.mousePos.add( new Point(-100,-100) ).getPixelsX();
  }

  public getMousePixelsY(): string {
    return this.mousePos.add( new Point(-100,-100) ).getPixelsY();
  }

  onKeyUp(e: KeyboardEvent) {
    //console.log(e);
    if( e.key == 'x' || e.key == 'X' || e.key == 'Escape') {
      this.hideSubMenu();
      this.currentBuildingType = new BuildingType();
    }
  }
}

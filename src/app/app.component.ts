import { Component } from '@angular/core';
import { Point } from './point';
import { BuildingType } from './buildingType';
import { Building } from './building';

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
  buildings = new Array<Building>;

  buildingSubMenus = {
    "Housing" : [
      new BuildingType("Housing Block A", "asset/Housing01.png", new Point(150, 100)),
      new BuildingType("Housing Block B", "asset/Housing02.png", new Point(150, 100)),
      new BuildingType("Housing Block C", "asset/Housing04.png", new Point(100, 100)),
      new BuildingType("Tower House", "asset/Housing05.png", new Point(100, 100)),
      new BuildingType("Luxury Housing", "asset/Housing03.png", new Point(250, 100)),
      new BuildingType("Fancy High-Rise Housing", "asset/FancyHighRiseHousing.png", new Point(150, 100)),
    ],
    "Power": [
      new BuildingType("Coal Plant", "asset/CoalPlant.png", new Point(200, 100)),
      new BuildingType("Nuclear Plant", "asset/NuclearPlant.png", new Point(250, 100)),
    ],
    "Water": [
      new BuildingType("Docks", "asset/Docks.png", new Point(200, 100)),
      new BuildingType("Dock Administration", "asset/DocksAdministration.png", new Point(250, 100)),
      new BuildingType("Water Tower", "asset/WaterTower01.png", new Point(50, 100)),
      new BuildingType("Large Water Tower", "asset/WaterTower02.png", new Point(80, 100)),
    ],
    "Industry": [
      new BuildingType("Factory", "asset/Factory.png", new Point(180, 100)),
      new BuildingType("Workshop", "asset/Workshop.png", new Point(100, 100)),
      new BuildingType("Office Tower A", "asset/OfficeTower01.png", new Point(100, 100)),
      new BuildingType("Office Tower B", "asset/OfficeTower02.png", new Point(150, 100)),
      new BuildingType("Office Tower C", "asset/OfficeTower03.png", new Point(100, 100)),
    ],
    "Entertainment": [
      new BuildingType("Bar & Nightclub", "asset/BarNightclub.png", new Point(150, 100)),
      new BuildingType("Casino Hotel", "asset/CasinoHotel.png", new Point(250, 100)),
      new BuildingType("Shopping Mall Hotel", "asset/HotelAndMall01.png", new Point(200, 100)),
      new BuildingType("Sport Stadium", "asset/Stadium.png", new Point(300, 100)),
    ],
    "Education": [
      new BuildingType("Humanities College", "asset/UniversityOldCollege.png", new Point(150, 100)),
      new BuildingType("Science College", "asset/UniversityNewCollege.png", new Point(150, 100)),
      new BuildingType("Library", "asset/Library01.png", new Point(150, 100)),
    ],
    "Transport": [
      new BuildingType("Airport Tower", "asset/AirportControlTower.png", new Point(200, 100)),
      new BuildingType("Airport Terminal", "asset/AirportTerminal.png", new Point(300, 100)),
    ],
    "Parks": [
      new BuildingType("Graveyard Chapel", "asset/GraveyardChapel.png", new Point(250, 100)),
    ],
  };

  demolishBuildingType = new BuildingType("Demolish", "asset/Demolish.png", new Point(100, 100));

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

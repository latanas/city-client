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
      new BuildingType("Housing Block A", "assets/Housing01.png", new Point(150, 100)),
      new BuildingType("Housing Block B", "assets/Housing02.png", new Point(150, 100)),
      new BuildingType("Housing Block C", "assets/Housing04.png", new Point(100, 100)),
      new BuildingType("Tower House", "assets/Housing05.png", new Point(100, 100)),
      new BuildingType("Luxury Housing", "assets/Housing03.png", new Point(250, 100)),
      new BuildingType("Fancy High-Rise Housing", "assets/FancyHighRiseHousing.png", new Point(150, 100)),
    ],
    "Power": [
      new BuildingType("Coal Plant", "assets/CoalPlant.png", new Point(200, 100)),
      new BuildingType("Nuclear Plant", "assets/NuclearPlant.png", new Point(250, 100)),
    ],
    "Water": [
      new BuildingType("Docks", "assets/Docks.png", new Point(200, 100)),
      new BuildingType("Dock Administration", "assets/DocksAdministration.png", new Point(250, 100)),
      new BuildingType("Water Tower", "assets/WaterTower01.png", new Point(50, 100)),
      new BuildingType("Large Water Tower", "assets/WaterTower02.png", new Point(80, 100)),
    ],
    "Industry": [
      new BuildingType("Factory", "assets/Factory.png", new Point(180, 100)),
      new BuildingType("Workshop", "assets/Workshop.png", new Point(100, 100)),
      new BuildingType("Office Tower A", "assets/OfficeTower01.png", new Point(100, 100)),
      new BuildingType("Office Tower B", "assets/OfficeTower02.png", new Point(150, 100)),
      new BuildingType("Office Tower C", "assets/OfficeTower03.png", new Point(100, 100)),
    ],
    "Entertainment": [
      new BuildingType("Bar & Nightclub", "assets/BarNightclub.png", new Point(150, 100)),
      new BuildingType("Casino Hotel", "assets/CasinoHotel.png", new Point(250, 100)),
      new BuildingType("Shopping Mall Hotel", "assets/HotelAndMall01.png", new Point(200, 100)),
      new BuildingType("Sport Stadium", "assets/Stadium.png", new Point(300, 100)),
    ],
    "Education": [
      new BuildingType("Humanities College", "assets/UniversityOldCollege.png", new Point(150, 100)),
      new BuildingType("Science College", "assets/UniversityNewCollege.png", new Point(150, 100)),
      new BuildingType("Library", "assets/Library01.png", new Point(150, 100)),
    ],
    "Transport": [
      new BuildingType("Airport Tower", "assets/AirportControlTower.png", new Point(200, 100)),
      new BuildingType("Airport Terminal", "assets/AirportTerminal.png", new Point(300, 100)),
    ],
    "Parks": [
      new BuildingType("Graveyard Chapel", "assets/GraveyardChapel.png", new Point(250, 100)),
    ],
  };

  demolishBuildingType = new BuildingType("Demolish", "assets/Demolish.png", new Point(100, 100));

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

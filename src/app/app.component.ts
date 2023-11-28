import { Component } from '@angular/core';
import { Point } from './point';
import { BuildingType } from './buildingType';
import { Building } from './building';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host:{"(mousemove)": "onMouseMove($event)"}
})

export class AppComponent {
  title = 'City';
  buildings = new Array<Building>;

  buildingSubMenus = {
    "Housing" : [
      new BuildingType("Housing 01", "assets/Housing01.png", new Point(100, 100)),
      new BuildingType("Housing 02", "assets/Housing02.png", new Point(100, 100)),
      new BuildingType("Luxury Housing", "assets/Housing03.png", new Point(100, 100)),      
    ],
    "Power": [
      new BuildingType("Coal Plant", "assets/CoalPlant.png", new Point(100, 100)),
      new BuildingType("Nuclear Plant", "assets/NuclearPlant.png", new Point(100, 100)),
    ],
    "Water": [
    ],
    "Industry": [
      new BuildingType("Factory", "assets/Factory.png", new Point(100, 100)),
    ],
    "Entertainment": [
      new BuildingType("Bar & Nightclub", "assets/BarNightclub.png", new Point(100, 100)),
      new BuildingType("Casino Hotel", "assets/CasinoHotel.png", new Point(100, 100)),
      new BuildingType("Sport Stadium", "assets/Stadium.png", new Point(100, 100)),
    ],
    "Education": [
    ],
    "Transport": [
      new BuildingType("Airport Tower", "assets/AirportControlTower.png", new Point(100, 100)),
      new BuildingType("Airport Terminal", "assets/AirportTerminal.png", new Point(100, 100)),
    ],
    "Parks": [
      new BuildingType("Graveyard Chapel", "assets/GraveyardChapel.png", new Point(100, 100)),
    ],
  };

  currentSubMenu = "";
  currentBuildingType = new BuildingType();

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

  public grabBuilding(buildingType: BuildingType) {
    this.hideSubMenu(); 
    this.currentBuildingType = buildingType;

  }

  public placeBuilding() {
    if( this.currentBuildingType.name != "")   {
      let pos = this.mousePos.add(new Point(-100,-100));

      this.buildings.push( new Building(this.currentBuildingType, pos) );
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
    return this.mousePos.add( new Point(-50,-50) ).getPixelsX();
  }

  public getMousePixelsY(): string {
    return this.mousePos.add( new Point(-50,-50) ).getPixelsY();
  }
}

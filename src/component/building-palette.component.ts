import { Output, EventEmitter, Component } from '@angular/core';

import { Point } from '../game/point';
import { BuildingType } from '../game/building-type';
import { Building } from '../game/building';

import { BuildingTypes } from 'src/game/abstract-building-type-factory';
import { BuildingTypeFactoryService } from '../service/building-type-factory.service';

@Component({
  selector: 'building-palette',
  //standalone: true,
  //imports: [],
  templateUrl: './building-palette.component.html',
  styleUrl: './building-palette.component.scss',
  host:{
    "(document:keyup)": "onKeyUp($event)"
  }
})
export class BuildingPaletteComponent {
  @Output() buildingTypeSelectedEvent = new EventEmitter<BuildingType>();

  appAssetFolder = "asset";
  demolishBuildingType = new BuildingType("Demolish", this.appAssetFolder + "/Demolish.png", new Point(100, 100));
  buildingTypePalette: BuildingTypes;

  currentSubMenu = "";
  hoverBuildingName = "";

  currentBuildingType = new BuildingType();
  
  constructor(btfService: BuildingTypeFactoryService) {
    this.buildingTypePalette = btfService.getBuildingTypeFactory().getBuildingTypes(this.appAssetFolder);
  }

  public hideSubMenu() {
    this.currentSubMenu = "";
  }

  public hoverOut() {
    this.hoverBuildingName = "";
  }

  public showSubMenu(menuName: string) {
    if (this.currentSubMenu != menuName) {
      this.currentSubMenu = menuName;
    }
    else {
      this.hideSubMenu();
    }
    this.currentBuildingType = new BuildingType();
    this.buildingTypeSelectedEvent.emit(this.currentBuildingType);
  }
  
  public hoverBuilding(buildingType: BuildingType) {
    this.hoverBuildingName = buildingType.name;
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
    this.buildingTypeSelectedEvent.emit(this.currentBuildingType);
  }

  onKeyUp(e: KeyboardEvent) {
    //console.log(e);
    if( e.key == 'x' || e.key == 'X' || e.key == 'Escape') {
      this.hideSubMenu();
      this.currentBuildingType = new BuildingType();
      this.buildingTypeSelectedEvent.emit(this.currentBuildingType);
    }
  }
}

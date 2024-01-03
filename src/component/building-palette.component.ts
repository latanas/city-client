import { Input, Output, EventEmitter, Component } from '@angular/core';

import { Point } from '../game/point';
import { Rect } from '../game/rect';
import { RectList } from '../game/rect-list';
import { BuildingType } from '../game/building-type';
import { DemolishBuildingType } from '../game/demolish-building-type';

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
  @Output() buildingToolSelectedEvent = new EventEmitter<BuildingType>();

  appAssetFolder = "asset";

  currentBuildingType: BuildingType = new BuildingType();
  demolishBuildingType = new DemolishBuildingType(this.appAssetFolder);
  buildingTypePalette: BuildingTypes;

  currentSubMenu = "";
  hoverBuildingName = "";
  
  constructor(btfService: BuildingTypeFactoryService) {
    this.buildingTypePalette = btfService.getBuildingTypeFactory().getBuildingTypes(this.appAssetFolder);
  }

  public finishToolAction() {
    this.currentBuildingType = new BuildingType();
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
    this.buildingToolSelectedEvent.emit(this.currentBuildingType);
  }
  
  public hoverBuilding(buildingType: BuildingType) {
    this.hoverBuildingName = buildingType.getName();
  }

  public grabBuilding(buildingType: BuildingType) {
    this.hideSubMenu();
    this.hoverOut();

    if ((this.currentBuildingType.getName() != "") && (buildingType == this.demolishBuildingType)) {
      this.currentBuildingType = new BuildingType();
    }
    else {
      this.currentBuildingType = buildingType;
    }
    this.buildingToolSelectedEvent.emit(this.currentBuildingType);
  }

  onKeyUp(e: KeyboardEvent) {
    //console.log(e);
    if( e.key == 'x' || e.key == 'X' || e.key == 'Escape') {
      this.hideSubMenu();
      this.currentBuildingType = new BuildingType();
      this.buildingToolSelectedEvent.emit(this.currentBuildingType);
    }
  }
}

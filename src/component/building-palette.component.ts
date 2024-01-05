import { Input, Output, EventEmitter, Component } from '@angular/core';

import { Point } from '../game/point';
import { BuildingType } from '../game/building-type';
import { RoadBuildingType } from '../game/road-building-type';
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
  @Input({required: true}) buildingTileSize!: Point;
  @Output() buildingToolSelectedEvent = new EventEmitter<BuildingType>();

  private readonly appAssetFolder = "asset";

  currentBuildingType: BuildingType;
  roadBuildingType: RoadBuildingType;
  demolishBuildingType: BuildingType;

  buildingTypePalette: BuildingTypes;

  currentSubMenu: string;
  hoverBuildingName: string;
  
  constructor(btfService: BuildingTypeFactoryService) {
    this.currentBuildingType = new BuildingType();
    this.demolishBuildingType = new DemolishBuildingType(this.appAssetFolder);
    this.roadBuildingType = new RoadBuildingType(this.appAssetFolder, new Point());
    
    this.buildingTypePalette = btfService.getBuildingTypeFactory().getBuildingTypes(this.appAssetFolder);

    this.currentSubMenu = "";
    this.hoverBuildingName = "";
  }

  ngOnInit() {
    this.roadBuildingType = new RoadBuildingType(this.appAssetFolder, this.buildingTileSize);
  }

  public buildingTypeEntries(): [string, BuildingType[]][]  {
    return Object.entries(this.buildingTypePalette);
  }

  public isToolEmpty() {
    return this.currentBuildingType.getName() == "";
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

  public grabRoadOrFinishAction() {
    if ( this.isToolEmpty() ) {
      this.grabBuilding(this.roadBuildingType);
    }
    else {
      this.finishToolAction();
      this.buildingToolSelectedEvent.emit(this.currentBuildingType);
    }
  }

  onKeyUp(e: KeyboardEvent) {
    if( e.key == 'x' || e.key == 'X' || e.key == 'Escape') {
      this.hideSubMenu();
      this.currentBuildingType = new BuildingType();
      this.buildingToolSelectedEvent.emit(this.currentBuildingType);
    }
  }
}

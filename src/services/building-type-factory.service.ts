import { Injectable } from '@angular/core';
import { BuildingTypeFactorySurrealist } from 'src/game/buildingTypeFactorySurrealist';

@Injectable({
  providedIn: 'root'
})
export class BuildingTypeFactoryService {
  constructor() {
  }

  public getBuildingTypeFactory() {
    return new BuildingTypeFactorySurrealist();
  }
}

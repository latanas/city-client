import { Injectable } from '@angular/core';
import { BuildingTypeFactorySurrealist } from 'src/game/building-type-factory-surrealist';

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

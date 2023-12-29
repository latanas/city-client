import { Injectable } from '@angular/core';
import { AbstractBuildingTypeFactory } from 'src/game/abstract-building-type-factory';
import { SurrealistBuildingTypeFactory } from 'src/game/surrealist-building-type-factory';

@Injectable({
  providedIn: 'root'
})
export class BuildingTypeFactoryService {
  public getBuildingTypeFactory(): AbstractBuildingTypeFactory {
    return new SurrealistBuildingTypeFactory();
  }
}

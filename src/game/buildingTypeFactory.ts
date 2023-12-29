/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Point } from "./point";
import { BuildingType } from "./buildingType"

// All the types of buildings that can be placed in the game
//
export type BuildingTypes = {
    Housing: BuildingType[],
    Power: BuildingType[],
    Water: BuildingType[],
    Industry: BuildingType[],
    Entertainment: BuildingType[],
    Education: BuildingType[],
    Transport: BuildingType[],
    Parks: BuildingType[],
}

// Factory interface for populating the buildings
//
export interface BuildingTypeFactory {
    getBuildingTypes(assetFolder: string): BuildingTypes;
}
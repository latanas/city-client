/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Point } from "./point";
import { BuildingType } from "./buildingType"
import { BuildingTypes } from "./buildingTypeFactory"
import { BuildingTypeFactory } from "./buildingTypeFactory"

// Default generator for all the building types
//
export class BuildingTypeFactorySurrealist implements BuildingTypeFactory {
    public getBuildingTypes(assetFolder: string): BuildingTypes {
        return {
            Housing: [
                new BuildingType("Housing Block A", assetFolder + "/Housing01.png", new Point(150, 100)),
                new BuildingType("Housing Block B", assetFolder + "/Housing02.png", new Point(150, 100)),
                new BuildingType("Housing Block C", assetFolder + "/Housing04.png", new Point(100, 100)),
                new BuildingType("Tower House", assetFolder + "/Housing05.png", new Point(100, 100)),
                new BuildingType("Luxury Housing", assetFolder + "/Housing03.png", new Point(250, 100)),
                new BuildingType("Fancy High-Rise Housing", assetFolder + "/FancyHighRiseHousing.png", new Point(150, 100)),
            ],
            Power: [
                new BuildingType("Coal Plant", assetFolder + "/CoalPlant.png", new Point(200, 100)),
                new BuildingType("Nuclear Plant", assetFolder + "/NuclearPlant.png", new Point(250, 100)),
            ],
            Water: [
                new BuildingType("Docks", assetFolder + "/Docks.png", new Point(200, 100)),
                new BuildingType("Dock Administration", assetFolder + "/DocksAdministration.png", new Point(250, 100)),
                new BuildingType("Water Tower", assetFolder + "/WaterTower01.png", new Point(50, 100)),
                new BuildingType("Large Water Tower", assetFolder + "/WaterTower02.png", new Point(80, 100)),
            ],
            Industry: [
                new BuildingType("Factory", assetFolder + "/Factory.png", new Point(180, 100)),
                new BuildingType("Workshop", assetFolder + "/Workshop.png", new Point(100, 100)),
                new BuildingType("Office Tower A", assetFolder + "/OfficeTower01.png", new Point(100, 100)),
                new BuildingType("Office Tower B", assetFolder + "/OfficeTower02.png", new Point(150, 100)),
                new BuildingType("Office Tower C", assetFolder + "/OfficeTower03.png", new Point(100, 100)),
            ],
            Entertainment: [
                new BuildingType("Bar & Nightclub", assetFolder + "/BarNightclub.png", new Point(150, 100)),
                new BuildingType("Casino Hotel", assetFolder + "/CasinoHotel.png", new Point(250, 100)),
                new BuildingType("Shopping Mall Hotel", assetFolder + "/HotelAndMall01.png", new Point(200, 100)),
                new BuildingType("Sport Stadium", assetFolder + "/Stadium.png", new Point(300, 100)),
            ],
            Education: [
                new BuildingType("Humanities College", assetFolder + "/UniversityOldCollege.png", new Point(150, 100)),
                new BuildingType("Science College", assetFolder + "/UniversityNewCollege.png", new Point(150, 100)),
                new BuildingType("Library", assetFolder + "/Library01.png", new Point(150, 100)),
            ],
            Transport: [
                new BuildingType("Airport Tower", assetFolder + "/AirportControlTower.png", new Point(200, 100)),
                new BuildingType("Airport Terminal", assetFolder + "/AirportTerminal.png", new Point(300, 100)),
            ],
            Parks: [
                new BuildingType("Graveyard Chapel", assetFolder + "/GraveyardChapel.png", new Point(250, 100)),
            ],
        };
    }
}
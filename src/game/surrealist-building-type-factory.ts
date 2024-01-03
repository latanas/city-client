/*
  Project: Golden
  Author:  Copyright (C) 2023, Atanas Laskov

  License: BSD license, see LICENSE for more details.

  http://www.laskov.co.uk/city/
*/
import { Point } from "./point";
import { ScaledImageBuildingType } from "./scaled-image-building-type"
import { BuildingTypes } from "./abstract-building-type-factory"
import { AbstractBuildingTypeFactory } from "./abstract-building-type-factory"

// Default generator for all the building types
//
export class SurrealistBuildingTypeFactory implements AbstractBuildingTypeFactory {
    public getBuildingTypes(assetFolder: string): BuildingTypes {
        return {
            Housing: [
                new ScaledImageBuildingType("Housing Block A", assetFolder + "/Housing01.png", new Point(150, 100)),
                new ScaledImageBuildingType("Housing Block B", assetFolder + "/Housing02.png", new Point(150, 100)),
                new ScaledImageBuildingType("Housing Block C", assetFolder + "/Housing04.png", new Point(100, 100)),
                new ScaledImageBuildingType("Tower House", assetFolder + "/Housing05.png", new Point(100, 100)),
                new ScaledImageBuildingType("Luxury Housing", assetFolder + "/Housing03.png", new Point(250, 100)),
                new ScaledImageBuildingType("Fancy High-Rise Housing", assetFolder + "/FancyHighRiseHousing.png", new Point(150, 100)),
            ],
            Power: [
                new ScaledImageBuildingType("Coal Plant", assetFolder + "/CoalPlant.png", new Point(200, 100)),
                new ScaledImageBuildingType("Nuclear Plant", assetFolder + "/NuclearPlant.png", new Point(250, 100)),
            ],
            Water: [
                //new ScaledImageBuildingType("Docks", assetFolder + "/Docks.png", new Point(200, 100)),
                //new ScaledImageBuildingType("Dock Administration", assetFolder + "/DocksAdministration.png", new Point(250, 100)),
                new ScaledImageBuildingType("Water Tower", assetFolder + "/WaterTower01.png", new Point(50, 100)),
                new ScaledImageBuildingType("Large Water Tower", assetFolder + "/WaterTower02.png", new Point(80, 100)),
            ],
            Industry: [
                new ScaledImageBuildingType("Factory", assetFolder + "/Factory.png", new Point(180, 100)),
                new ScaledImageBuildingType("Workshop", assetFolder + "/Workshop.png", new Point(100, 100)),
                new ScaledImageBuildingType("Office Tower A", assetFolder + "/OfficeTower01.png", new Point(100, 100)),
                new ScaledImageBuildingType("Office Tower B", assetFolder + "/OfficeTower02.png", new Point(150, 100)),
                new ScaledImageBuildingType("Office Tower C", assetFolder + "/OfficeTower03.png", new Point(100, 100)),
            ],
            Entertainment: [
                new ScaledImageBuildingType("Bar & Nightclub", assetFolder + "/BarNightclub.png", new Point(150, 100)),
                new ScaledImageBuildingType("Casino Hotel", assetFolder + "/CasinoHotel.png", new Point(250, 100)),
                new ScaledImageBuildingType("Shopping Mall Hotel", assetFolder + "/HotelAndMall01.png", new Point(200, 100)),
                new ScaledImageBuildingType("Sport Stadium", assetFolder + "/Stadium.png", new Point(300, 100)),
            ],
            Education: [
                new ScaledImageBuildingType("Humanities College", assetFolder + "/UniversityOldCollege.png", new Point(150, 100)),
                new ScaledImageBuildingType("Science College", assetFolder + "/UniversityNewCollege.png", new Point(150, 100)),
                new ScaledImageBuildingType("Library", assetFolder + "/Library01.png", new Point(150, 100)),
            ],
            Transport: [
                new ScaledImageBuildingType("Airport Tower", assetFolder + "/AirportControlTower.png", new Point(200, 100)),
                new ScaledImageBuildingType("Airport Terminal", assetFolder + "/AirportTerminal.png", new Point(300, 100)),
            ],
            Parks: [
                new ScaledImageBuildingType("Graveyard Chapel", assetFolder + "/GraveyardChapel.png", new Point(250, 100)),
            ],
        };
    }
}
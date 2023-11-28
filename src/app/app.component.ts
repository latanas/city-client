import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'City';

  showSubPaletteHousing = false;
  showSubPalettePower = false;
  showSubPaletteWater = false;
  showSubPaletteIndustry = false;
  showSubPaletteEntertainment = false;
  showSubPaletteEducation = false;
  showSubPaletteTransport = false;
  showSubPaletteParks = false;

  public hideAllSubMenus() {
    this.showSubPaletteHousing = false;
    this.showSubPalettePower = false;
    this.showSubPaletteWater = false;
    this.showSubPaletteIndustry = false;
    this.showSubPaletteEntertainment = false;
    this.showSubPaletteEducation = false;
    this.showSubPaletteTransport = false;
    this.showSubPaletteParks = false;
  }
}

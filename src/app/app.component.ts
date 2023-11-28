import { Component } from '@angular/core';
import { Point } from './point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host:{"(mousemove)": "onMouseMove($event)"}
})

export class AppComponent {
  title = 'City';

  currentSubMenu = "";
  currentBuildingName = "";

  mousePos = new Point();

  public showSubMenu(menuName: string) {
    this.currentSubMenu = menuName;
  }
  public hideSubMenu() {
    this.currentSubMenu = "";
  }

  public grabBuilding(buildingName: string) {
    this.hideSubMenu(); 
    this.currentBuildingName = buildingName;
  }

  public placeBuilding() {
    this.currentBuildingName = "";
  }

  onMouseMove(e: MouseEvent) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;

    console.log(this.mousePos.x);
  }
}

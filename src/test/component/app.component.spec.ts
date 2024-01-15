import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../component/app.component';
import { NavigationMenuComponent } from '../../component/navigation-menu.component';
import { BuildingPaletteComponent } from '../../component/building-palette.component';
import { VersionInformationComponent } from '../../component/version-information.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent, NavigationMenuComponent, BuildingPaletteComponent, VersionInformationComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title 'City @ Atanas Laskov'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('City @ Atanas Laskov');
  });
});

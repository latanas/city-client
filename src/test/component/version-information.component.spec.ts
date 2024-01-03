import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionInformationComponent } from '../../component/version-information.component';

describe('VersionInformationComponent', () => {
  let component: VersionInformationComponent;
  let fixture: ComponentFixture<VersionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VersionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

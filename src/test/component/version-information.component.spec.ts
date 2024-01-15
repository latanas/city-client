import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionInformationComponent } from '../../component/version-information.component';

describe('VersionInformationComponent', () => {
  let component: VersionInformationComponent;
  let fixture: ComponentFixture<VersionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VersionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have version string', () => {
    const fixture = TestBed.createComponent(VersionInformationComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.version_info strong')?.textContent).toContain('Version 0.0.9');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoRedoMenuComponent } from '../../component/undo-redo-menu.component';

describe('UndoRedoMenuComponent', () => {
  let component: UndoRedoMenuComponent;
  let fixture: ComponentFixture<UndoRedoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndoRedoMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UndoRedoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

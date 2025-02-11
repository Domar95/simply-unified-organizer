import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecordPageComponent } from './edit-record-page.component';

describe('EditRecordPageComponent', () => {
  let component: EditRecordPageComponent;
  let fixture: ComponentFixture<EditRecordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecordPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRecordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

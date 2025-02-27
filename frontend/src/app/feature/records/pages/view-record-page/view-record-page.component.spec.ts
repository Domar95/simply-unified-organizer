import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecordPageComponent } from './view-record-page.component';

describe('ViewRecordPageComponent', () => {
  let component: ViewRecordPageComponent;
  let fixture: ComponentFixture<ViewRecordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRecordPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

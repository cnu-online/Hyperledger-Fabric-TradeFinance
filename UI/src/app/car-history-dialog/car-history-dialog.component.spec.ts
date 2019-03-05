import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHistoryDialogComponent } from './car-history-dialog.component';

describe('CarHistoryDialogComponent', () => {
  let component: CarHistoryDialogComponent;
  let fixture: ComponentFixture<CarHistoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

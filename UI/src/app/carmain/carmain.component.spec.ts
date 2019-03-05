import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarmainComponent } from './carmain.component';

describe('CarmainComponent', () => {
  let component: CarmainComponent;
  let fixture: ComponentFixture<CarmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRentalComponent } from './single-rental.component';

describe('SingleRentalComponent', () => {
  let component: SingleRentalComponent;
  let fixture: ComponentFixture<SingleRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

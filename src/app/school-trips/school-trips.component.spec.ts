import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTripsComponent } from './school-trips.component';

describe('SchoolTripsComponent', () => {
  let component: SchoolTripsComponent;
  let fixture: ComponentFixture<SchoolTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

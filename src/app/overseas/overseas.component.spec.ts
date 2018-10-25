import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverseasComponent } from './overseas.component';

describe('OverseasComponent', () => {
  let component: OverseasComponent;
  let fixture: ComponentFixture<OverseasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverseasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverseasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

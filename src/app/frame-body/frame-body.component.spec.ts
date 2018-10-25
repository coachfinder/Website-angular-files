import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameBodyComponent } from './frame-body.component';

describe('FrameBodyComponent', () => {
  let component: FrameBodyComponent;
  let fixture: ComponentFixture<FrameBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

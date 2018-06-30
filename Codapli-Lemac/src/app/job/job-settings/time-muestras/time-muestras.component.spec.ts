import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeMuestrasComponent } from './time-muestras.component';

describe('TimeMuestrasComponent', () => {
  let component: TimeMuestrasComponent;
  let fixture: ComponentFixture<TimeMuestrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeMuestrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeMuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

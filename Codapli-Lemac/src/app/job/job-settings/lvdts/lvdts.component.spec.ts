import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LvdtsComponent } from './lvdts.component';

describe('LvdtsComponent', () => {
  let component: LvdtsComponent;
  let fixture: ComponentFixture<LvdtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LvdtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LvdtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

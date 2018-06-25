import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypeSelectionComponent } from './job-type-selection.component';

describe('JobTypeSelectionComponent', () => {
  let component: JobTypeSelectionComponent;
  let fixture: ComponentFixture<JobTypeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTypeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAycfComponent } from './job-aycf.component';

describe('JobAycfComponent', () => {
  let component: JobAycfComponent;
  let fixture: ComponentFixture<JobAycfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAycfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAycfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

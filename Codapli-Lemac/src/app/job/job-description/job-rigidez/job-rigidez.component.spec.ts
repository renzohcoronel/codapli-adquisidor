import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRigidezComponent } from './job-rigidez.component';

describe('JobRigidezComponent', () => {
  let component: JobRigidezComponent;
  let fixture: ComponentFixture<JobRigidezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRigidezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRigidezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

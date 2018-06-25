import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobConfirmComponent } from './job-confirm.component';

describe('JobConfirmComponent', () => {
  let component: JobConfirmComponent;
  let fixture: ComponentFixture<JobConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

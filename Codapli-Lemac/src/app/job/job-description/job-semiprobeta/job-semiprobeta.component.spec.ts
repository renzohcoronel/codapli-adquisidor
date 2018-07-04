import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSemiprobetaComponent } from './job-semiprobeta.component';

describe('JobSemiprobetaComponent', () => {
  let component: JobSemiprobetaComponent;
  let fixture: ComponentFixture<JobSemiprobetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSemiprobetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSemiprobetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

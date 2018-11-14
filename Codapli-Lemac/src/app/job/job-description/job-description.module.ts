import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JobSemiprobetaComponent } from './job-semiprobeta/job-semiprobeta.component';
import { JobRigidezComponent } from './job-rigidez/job-rigidez.component';
import { JobAycfComponent } from './job-aycf/job-aycf.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [JobSemiprobetaComponent, JobRigidezComponent, JobAycfComponent],
  exports: [ JobSemiprobetaComponent, JobRigidezComponent, JobAycfComponent]
})
export class JobDescriptionModule { }

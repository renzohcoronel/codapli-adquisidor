import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobContainerComponent } from './job-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { SettingsService } from '../services/settings.service';
import {MatStepperModule} from '@angular/material/stepper';
import { JobDescriptionModule } from './job-description/job-description.module';
import {MatCardModule} from '@angular/material/card';
import { JobTypeSelectionModule } from './job-type-selection/job-type-selection.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    JobDescriptionModule,
    JobTypeSelectionModule
    
  ],
  declarations: [JobContainerComponent],
  exports: [JobContainerComponent],
  providers: [ JobsService, SettingsService ]
})
export class JobModule { }

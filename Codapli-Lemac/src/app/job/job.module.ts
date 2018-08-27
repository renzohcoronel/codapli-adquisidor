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
import { JobSettingsModule } from './job-settings/job-settings.module';
import { ExperimentModule } from './job-experiment/experiment/experiment.module';
import { ExperimentViewerModule } from './job-experiment/experiment-viewer/experiment-viewer.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    JobDescriptionModule,
    JobTypeSelectionModule,
    JobSettingsModule,
    ExperimentModule,
    ExperimentViewerModule,
    
  ],
  declarations: [JobContainerComponent],
  exports: [JobContainerComponent],
  providers: [ JobsService, SettingsService ]
})
export class JobModule { }

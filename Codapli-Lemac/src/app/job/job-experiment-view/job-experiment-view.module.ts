import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobExperimentModule } from '../job-experiment/job-experiment.module';
import { JobSettingsModule } from '../job-settings/job-settings.module';
import { jobViewService } from '../../services/job-view.servicet';

@NgModule({
  declarations: [],
  imports: [ CommonModule , JobSettingsModule , JobExperimentModule ],
  exports: [],
  providers: [jobViewService],
})
export class jobExperimentView {}

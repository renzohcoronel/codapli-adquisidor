import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobExperimentModule } from "../job-experiment/job-experiment.module";
import { JobSettingsModule } from "../job-settings/job-settings.module";
import { JobsService } from "../../services/jobs.service";
import { JobDescriptionModule } from "../job-description/job-description.module";
import { JobExperimentView } from "./job-experiment-view.component";

@NgModule({
  declarations: [JobExperimentView ],
  imports: [CommonModule,
    ,
    ],
  exports: [JobExperimentView],
  providers: [JobsService]
})
export class JobExperimentViewModule {}

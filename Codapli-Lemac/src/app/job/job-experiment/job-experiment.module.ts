import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentComponent } from './experiment/experiment.component';
import { JobsService } from '../../services/jobs.service';
import { ListDetailAycfComponent } from './experiment/list-detail-aycf/list-detail-aycf.component';
import { ListDetailSemiprobetaComponent } from './experiment/list-detail-semiprobeta/list-detail-semiprobeta.component';
import { ListDetailRigidezComponent } from './experiment/list-detail-rigidez/list-detail-rigidez.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExperimentComponent, ListDetailAycfComponent, ListDetailSemiprobetaComponent, ListDetailRigidezComponent],
  exports: [ExperimentComponent, ListDetailAycfComponent, ListDetailSemiprobetaComponent, ListDetailRigidezComponent],
  providers:[JobsService]
})
export class JobExperimentModule { }

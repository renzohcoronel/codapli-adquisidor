import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentComponent } from './experiment.component';
import { ListDetailAYCFModule } from './list-detail-aycf/list-detail.aycf.module';
import { ListDetailRigidezModule } from './list-detail-rigidez/list-detail-rigidez.module';
import { ListDetailSemiprobetaModule } from './list-detail-semiprobeta/list-detail-semiprobeta.module';
import { LecturasModule } from '../job-settings/lecturas/lecturas.module';

@NgModule({
  declarations: [ExperimentComponent],
  imports: [ CommonModule,
        ListDetailAYCFModule,
        ListDetailRigidezModule,
        ListDetailSemiprobetaModule,
        LecturasModule ],
  exports: [ExperimentComponent],
  providers: [],
})
export class ExperimentModule {}

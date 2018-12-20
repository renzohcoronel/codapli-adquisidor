import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobViewComponent } from './job-view.component';
import { ListDetailAYCFModule } from '../job-experiment/list-detail-aycf/list-detail.aycf.module';
import { ListDetailRigidezModule } from '../job-experiment/list-detail-rigidez/list-detail-rigidez.module';
import { ListDetailSemiprobetaModule } from '../job-experiment/list-detail-semiprobeta/list-detail-semiprobeta.module';
import { RouterModule } from '@angular/router';
import { LecturasModule } from '../job-settings/lecturas/lecturas.module';

@NgModule({
  declarations: [JobViewComponent],
  imports: [ CommonModule, RouterModule,
      ListDetailAYCFModule,
    ListDetailRigidezModule,
  ListDetailSemiprobetaModule, LecturasModule],
  exports: [JobViewComponent],
  providers: [],
})
export class JobViewModule {}

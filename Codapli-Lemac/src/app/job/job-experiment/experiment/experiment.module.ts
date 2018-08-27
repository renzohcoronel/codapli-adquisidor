import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentComponent } from './experiment.component';
import { JobsService } from '../../../services/jobs.service';
import { ListDetailAycfModule } from '../list-detail-aycf/list-detail-aycf.module';
import { ListDetailRigidezModule } from '../list-detail-rigidez/list-detail-rigidez.module';
import { ListDetailSemiprobetaModule } from '../list-detail-semiprobeta/list-detail-semiprobeta.module';

@NgModule({
    imports: [CommonModule,ListDetailAycfModule,ListDetailRigidezModule,ListDetailSemiprobetaModule],
    exports: [ExperimentComponent],
    declarations: [ExperimentComponent],
    providers: [JobsService],
})

export class ExperimentModule { }

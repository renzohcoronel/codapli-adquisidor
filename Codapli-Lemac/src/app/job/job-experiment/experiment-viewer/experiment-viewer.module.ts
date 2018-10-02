import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentViewerComponent } from './experiment-viewer.component';
import { ExperimentComponent } from '../experiment/experiment.component';
import { ExperimentModule } from '../experiment/experiment.module';

@NgModule({
    imports: [CommonModule,ExperimentModule],
    exports: [ExperimentViewerComponent,ExperimentComponent],
    declarations: [ExperimentViewerComponent,ExperimentViewerComponent],
    providers: [],
})
export class ExperimentViewerModule { }

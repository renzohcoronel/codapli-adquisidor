import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentViewerComponent } from './experiment-viewer.component';

@NgModule({
    imports: [CommonModule],
    exports: [ExperimentViewerComponent],
    declarations: [ExperimentViewerComponent],
    providers: [],
})
export class ExperimentViewerModule { }

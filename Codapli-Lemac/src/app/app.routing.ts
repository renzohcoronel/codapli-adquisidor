import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobContainerComponent } from './job/job-container.component';
import { ExperimentComponent } from './job/job-experiment/experiment/experiment.component';

const routes: Routes = [
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
    { path: 'jobs', component: JobsComponent },
    { path: 'job', children:[
        { path:'', component : JobContainerComponent},
        { path: 'experiment', component : ExperimentComponent}
    ]},

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: false })],
    exports: [RouterModule]
})

export class AppRoutingModule { }

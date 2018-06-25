import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobContainerComponent } from './job/job-container.component';

const routes: Routes = [
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
    { path: 'jobs', component: JobsComponent },
    { path: 'job', component: JobContainerComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }

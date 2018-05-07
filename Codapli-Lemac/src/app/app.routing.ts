import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
    { path: 'jobs', component: JobsComponent },
    { path: 'job', component: JobComponent },
    { path: 'settings', component: SettingComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }

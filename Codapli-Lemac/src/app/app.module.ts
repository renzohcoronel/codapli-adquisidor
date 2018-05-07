import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { JobComponent } from './job/job.component';
import { SettingComponent } from './setting/setting.component';


@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    MenuBarComponent,
    JobComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [JobsComponent, MenuBarComponent, JobComponent, SettingComponent]
})
export class AppModule { }

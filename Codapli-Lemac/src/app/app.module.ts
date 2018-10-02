import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { JobsService } from './services/jobs.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { SettingsService } from './services/settings.service';
import { FooterModule } from './footer/footer.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobModule } from './job/job.module';
import { ExperimentViewerModule } from './job/job-experiment/experiment-viewer/experiment-viewer.module';


@NgModule({
  declarations: [

    AppComponent,
    JobsComponent,
    MenuBarComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FooterModule,
    JobModule,
    ExperimentViewerModule
  ],
  providers: [JobsService,SettingsService, ToastrService],
  bootstrap: [AppComponent],
  exports: [JobsComponent, MenuBarComponent]
})
export class AppModule { }

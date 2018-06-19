import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { JobComponent } from './job/job.component';
import { SettingComponent } from './setting/setting.component';
import { HttpClientModule } from '@angular/common/http';
import { JobsService } from './services/jobs.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TestComponent } from './test/test.component';
import { SettingsService } from './services/settings.service';
import { FooterModule } from './footer/footer.module';


@NgModule({
  declarations: [

    AppComponent,
    JobsComponent,
    MenuBarComponent,
    JobComponent,
    SettingComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FooterModule
  ],
  providers: [JobsService,SettingsService],
  bootstrap: [AppComponent],
  exports: [JobsComponent, MenuBarComponent, JobComponent, SettingComponent, TestComponent]
})
export class AppModule { }

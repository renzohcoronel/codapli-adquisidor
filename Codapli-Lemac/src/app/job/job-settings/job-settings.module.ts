import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSettingsComponent } from './job-settings.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JobSettingsComponent],
  exports: [JobSettingsComponent]
})
export class JobSettingsModule { }

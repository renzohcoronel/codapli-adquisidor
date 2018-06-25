import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobConfirmComponent } from './job-confirm.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JobConfirmComponent],
  exports: [JobConfirmComponent]
})
export class JobConfirmModule { }

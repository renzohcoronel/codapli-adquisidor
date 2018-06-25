import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobTypeSelectionComponent } from './job-type-selection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  declarations: [JobTypeSelectionComponent],
  exports: [JobTypeSelectionComponent]
})
export class JobTypeSelectionModule { }

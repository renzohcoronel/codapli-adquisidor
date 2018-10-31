import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSettingsComponent } from './job-settings.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LecturasComponent } from './lecturas/lecturas.component';
import { CeldaComponent } from './celda/celda.component';
import { LvdtsComponent } from './lvdts/lvdts.component';

@NgModule({
  imports: [
    CommonModule,   
    MatCardModule,
    ReactiveFormsModule
  ],
  declarations: [JobSettingsComponent, LecturasComponent, CeldaComponent, LvdtsComponent],
  exports: [JobSettingsComponent, LecturasComponent, CeldaComponent, LvdtsComponent, ]
})
export class JobSettingsModule { }

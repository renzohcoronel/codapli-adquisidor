import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSettingsComponent } from './job-settings.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LecturasComponent } from './lecturas/lecturas.component';
import { CeldaComponent } from './celda/celda.component';
import { LvdtsComponent } from './lvdts/lvdts.component';
import { AlertModule } from '../../components/alert.module';
import { LecturasModule } from './lecturas/lecturas.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    AlertModule,
    LecturasModule
  ],
  declarations: [JobSettingsComponent,  CeldaComponent, LvdtsComponent],
  exports: [JobSettingsComponent, CeldaComponent, LvdtsComponent, ]
})
export class JobSettingsModule { }

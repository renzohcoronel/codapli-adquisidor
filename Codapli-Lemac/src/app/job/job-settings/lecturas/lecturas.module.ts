import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturasComponent } from './lecturas.component';

@NgModule({
  declarations: [LecturasComponent],
  imports: [ CommonModule ],
  exports: [LecturasComponent],
  providers: [],
})
export class LecturasModule {}

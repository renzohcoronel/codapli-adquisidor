import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertCodapliService } from './alert.service';

@NgModule({
  declarations: [AlertComponent],
  imports: [ CommonModule ],
  exports: [AlertComponent],
  providers: [AlertCodapliService],
})
export class AlertModule {}

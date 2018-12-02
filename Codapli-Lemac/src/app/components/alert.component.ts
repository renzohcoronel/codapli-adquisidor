import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertCodapliService } from './alert.service';

@Component({
  selector: 'app-alert',
  template: `
    <div  *ngIf="message" class="row" role="alert">
        <div class="col-md-12 text-center alert">
            <span class="blink_me"> {{message}}</span>
        </div>
    </div>

  `,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;
  constructor(private alertService: AlertCodapliService) {

    this.alertService.getMessage().subscribe(message => { this.message = message; });
   }

  ngOnInit(): void { }


  

}

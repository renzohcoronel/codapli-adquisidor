import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div  *ngIf="mostrar" class="alert" role="alert">
          {{message}}
    </div>

  `,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() mostar: Boolean;
  @Input() message: String;

  constructor() { }

  ngOnInit(): void { }
}

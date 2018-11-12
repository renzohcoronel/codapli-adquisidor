import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lecturas',
  template: `
    <div class="row">
    <div class="col-12">
      <ul [class]="cssClass">
        <li class="p-3"><strong>CELDA:</strong>  {{celda}}  {{unitCelda}}</li>
        <li class="p-3"><strong>LVDT-1:</strong> {{lvdt0}}  {{unitlvdt0}}</li>
        <li class="p-3"><strong>LVDT-2:</strong> {{lvdt1}}  {{unitlvdt1}}</li>
      </ul>
    </div>
  </div>
  `,
  styleUrls: ['./lecturas.component.css']
})
export class LecturasComponent implements OnInit {
  @Input() cssClass ='';
  @Input() celda:any;
  @Input() unitCelda = 'Kg';
  @Input() lvdt0:any;
  @Input() unitlvdt0 = 'mm';
  @Input() lvdt1:any;
  @Input() unitlvdt1 = 'mm';
  constructor() { }

  ngOnInit() {


  }
}

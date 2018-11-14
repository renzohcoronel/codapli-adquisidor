import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../../models/job';

@Component({
  selector: 'app-list-detail-aycf',
  template: `
      <ul class="list-group">
        <li>Dimensiones : {{job.dimensiones}}</li>
        <li>Material : {{job.material}}</li>
        <li>Temperatura : {{job.temperatura}}</li>
        <li>Recorrido de la placa : {{job.recorridoPlaca}}</li>
      </ul>
  `,
  styleUrls: ['./list-detail-aycf.component.css']
})
export class ListDetailAycfComponent implements OnInit {

  @Input() job:Job;
  
  constructor() { }

  ngOnInit() {
  }

}

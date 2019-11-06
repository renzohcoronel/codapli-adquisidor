import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job';


@Component({
  selector: 'app-list-detail-aycf',
  template: `
  <div>
    <p>Cantidad de Aperturas y cierre: {{appCierre}}<p>
  </div>
  <ul class="list-group">
  <li>alto : {{job.alto}}</li>
  <li>Ancho : {{job.ancho}}</li>
  <li>profundidad : {{job.profundidad}}</li>
  <li>Material : {{job.material}}</li>
  <li>Temperatura : {{job.temperatura}}</li>
  <li>Recorrido de la placa : {{job.recorridoPlaca}}</li>
  </ul>

  `,
  styleUrls: ['./list-detail-aycf.component.css']
})
export class ListDetailAycfComponent implements OnInit {

  @Input() job:Job;
  @Input() appCierre:number;

  constructor() { }

  ngOnInit() {
  }

}

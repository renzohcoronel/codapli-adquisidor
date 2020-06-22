import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job';


@Component({
  selector: 'app-list-detail-aycf',
  template: `
  <div>
    <ul class="list-group">
      <li>Valor maximo Celda de carga: {{ maxs.celda }}</li>
      <li>Valor maximo LVDT0: {{ maxs.lvdt0 }}</li>
      <li>Valor maximo LVDT1: {{ maxs.lvdt1 }}</li>
      <li>Valor minimo Celda de carga: {{ mins.celda }}</li>
      <li>Valor minimo LVDT0: {{ mins.lvdt0 }}</li>
      <li>Valor minimo LVDT1: {{ mins.lvdt1 }}</li>
    </ul>
  </div>
  <div >
    <ul class="list-group">
      <li>alto : {{job.alto}}</li>
      <li>Ancho : {{job.ancho}}</li>
      <li>profundidad : {{job.profundidad}}</li>
      <li>Material : {{job.material}}</li>
      <li>Temperatura : {{job.temperatura}}</li>
      <li>Recorrido de la placa : {{job.recorridoPlaca}}</li>
    </ul>
  </div>

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

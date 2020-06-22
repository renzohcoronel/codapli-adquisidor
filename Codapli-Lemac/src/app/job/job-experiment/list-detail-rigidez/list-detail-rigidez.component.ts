import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job';


@Component({
  selector: 'app-list-detail-rigidez',
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
  <div>
    <ul class="list-group">
      <li>Material : {{job.material}}</li>
      <li>Frecuencia : {{job.frecuencia}}</li>
      <li>Alto : {{job.alto}}</li>
      <li>Ancho : {{job.ancho}}</li>
      <li>Profundidad : {{job.profundidad}}</li>
      <li>Carga : {{job.carga}}</li>
      <li>Muestra : {{job.muestra}}</li>
      <li>Temperatura : {{job.temperatura}}</li>
    </ul>
  </div>


  `,
  styleUrls: ['./list-detail-rigidez.component.css']
})
export class ListDetailRigidezComponent implements OnInit {

  @Input() job:Job;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job';


@Component({
  selector: 'app-list-detail-rigidez',
  template: `
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


  `,
  styleUrls: ['./list-detail-rigidez.component.css']
})
export class ListDetailRigidezComponent implements OnInit {

  @Input() job:Job;
  constructor() { }

  ngOnInit() {
  }

}

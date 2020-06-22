import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job';


@Component({
  selector: 'app-list-detail-aycf',
  template: `
  <div class = "row " >
    <div class="col-md-4">
      <ul class="list-group">
        <li><strong>Alto: </strong>{{job.alto}}</li>
        <li><strong>Ancho: </strong>{{job.ancho}}</li>
        <li><strong>Profundidad: </strong>{{job.profundidad}}</li>
        <li><strong>Material: </strong>{{job.material}}</li>
        <li><strong>Temperatura: </strong>{{job.temperatura}}</li>
        <li><strong>Recorrido de la placa: </strong>{{job.recorridoPlaca}}</li>
      </ul>
    </div>
    <div class="col-md-8 " >
      <ul class="list-group ">
        <li><strong>Cantidad de aperturas y cierre: </strong>{{ appCierre }}
        <li><strong>Valor maximo Celda de carga: </strong>{{ maxs.celda }}</li>
        <li><strong>Valor maximo LVDT0: </strong>{{ maxs.lvdt0 }}</li>
        <li><strong>Valor maximo LVDT1: </strong>{{ maxs.lvdt1 }}</li>
        <li><strong>Valor minimo Celda de carga: </strong>{{ mins.celda }}</li>
        <li><strong>Valor minimo LVDT0: </strong>{{ mins.lvdt0 }}</li>
        <li><strong>Valor minimo LVDT1: </strong>{{ mins.lvdt1 }}</li>
      </ul>
    </div>
  </div>
  `,
  styleUrls: ['./list-detail-aycf.component.css']
})
export class ListDetailAycfComponent implements OnInit {

  @Input() job:Job;
  @Input() appCierre:number;
  @Input() maxs:Object;
  @Input() mins:Object;


  constructor() { }

  ngOnInit() {
  }

}

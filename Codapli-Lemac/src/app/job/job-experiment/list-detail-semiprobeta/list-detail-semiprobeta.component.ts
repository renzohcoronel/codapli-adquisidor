import { Component, OnInit, Input } from "@angular/core";
import { Job } from "../../../models/job";


@Component({
  selector: "app-list-detail-semiprobeta",
  template: `
  <div>
    <ul class = "list-group">
      <p>Area debajo curva Celda de carga: {{ areas.celda }}</p>
      <p>Area debajo curva LVDT0: {{ areas.lvdt0 }}</p>
      <p>Area debajo curva LVDT1: {{ areas.lvdt1 }}</p>
    </ul>
  </div>
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
      <li>Muestra : {{ job.muestra }}</li>
      <li>Material : {{ job.material }}</li>
      <li>Diametro : {{ job.diametro }}</li>
      <li>Espesor : {{ job.espesor }}</li>
      <li>Ranura : {{ job.ranura }}</li>
    </ul>
  </div>
  `,
  styleUrls: ["./list-detail-semiprobeta.component.css"]
})
export class ListDetailSemiprobetaComponent implements OnInit {
  @Input() job: Job;
  constructor() {}

  ngOnInit() {}
}

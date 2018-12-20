import { Component, OnInit, Input } from "@angular/core";
import { Job } from "../../../models/job";


@Component({
  selector: "app-list-detail-semiprobeta",
  template: `
    <ul class="list-group">
      <li>Muestra : {{ job.muestra }}</li>
      <li>Material : {{ job.material }}</li>
      <li>Diametro : {{ job.diametro }}</li>
      <li>Espesor : {{ job.espesor }}</li>
      <li>Ranura : {{ job.ranura }}</li>
    </ul>
  `,
  styleUrls: ["./list-detail-semiprobeta.component.css"]
})
export class ListDetailSemiprobetaComponent implements OnInit {
  @Input() job: Job;
  constructor() {}

  ngOnInit() {}
}

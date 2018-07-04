import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../../models/job';

@Component({
  selector: 'app-list-detail-semiprobeta',
  templateUrl: './list-detail-semiprobeta.component.html',
  styleUrls: ['./list-detail-semiprobeta.component.css']
})
export class ListDetailSemiprobetaComponent implements OnInit {

  @Input() job:Job; 
  constructor() { }

  ngOnInit() {
  }

}

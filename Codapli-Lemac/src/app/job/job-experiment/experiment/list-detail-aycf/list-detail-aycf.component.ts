import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../../models/job';

@Component({
  selector: 'app-list-detail-aycf',
  templateUrl: './list-detail-aycf.component.html',
  styleUrls: ['./list-detail-aycf.component.css']
})
export class ListDetailAycfComponent implements OnInit {

  @Input() job:Job; 
  constructor() { }

  ngOnInit() {
  }

}

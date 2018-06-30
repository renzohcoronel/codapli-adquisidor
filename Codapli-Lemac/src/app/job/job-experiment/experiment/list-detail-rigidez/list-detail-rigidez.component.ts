import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../../models/job';

@Component({
  selector: 'app-list-detail-rigidez',
  templateUrl: './list-detail-rigidez.component.html',
  styleUrls: ['./list-detail-rigidez.component.css']
})
export class ListDetailRigidezComponent implements OnInit {

  @Input() job:Job; 
  constructor() { }

  ngOnInit() {
  }

}

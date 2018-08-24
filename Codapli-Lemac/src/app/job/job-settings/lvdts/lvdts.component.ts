import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lvdts',
  templateUrl: './lvdts.component.html',
  styleUrls: ['./lvdts.component.css']
})
export class LvdtsComponent implements OnInit {

  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}

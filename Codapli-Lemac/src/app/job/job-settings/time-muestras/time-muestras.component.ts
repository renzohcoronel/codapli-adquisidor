import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-time-muestras',
  templateUrl: './time-muestras.component.html',
  styleUrls: ['./time-muestras.component.css']
})
export class TimeMuestrasComponent implements OnInit {

  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}

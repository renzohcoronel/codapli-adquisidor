import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-aycf',
  templateUrl: './job-aycf.component.html',
  styleUrls: ['./job-aycf.component.css']
})
export class JobAycfComponent implements OnInit {
  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
    console.log("Formulario AyCF");
  }

}

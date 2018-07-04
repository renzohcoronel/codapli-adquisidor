import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-rigidez',
  templateUrl: './job-rigidez.component.html',
  styleUrls: ['./job-rigidez.component.css']
})
export class JobRigidezComponent implements OnInit {
  
  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
    console.log("Formulario rigidez");
  }

}

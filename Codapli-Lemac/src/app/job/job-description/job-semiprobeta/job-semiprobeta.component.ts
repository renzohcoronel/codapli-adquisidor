import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-semiprobeta',
  templateUrl: './job-semiprobeta.component.html',
  styleUrls: ['./job-semiprobeta.component.css']
})
export class JobSemiprobetaComponent implements OnInit {

  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
    console.log("Formulario semiprobeta");
  }

}

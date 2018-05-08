import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewContainerData } from '@angular/core/src/view';
import { Location } from '@angular/common';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: Location) {
    this.formGroup = this.formBuilder.group({
      desplazamientImpueso: [null, Validators.required],
      tipoMuestra: [null, Validators.required],
      temperaturaEnsayo: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  submit(value: any): void {
    console.log(value);
  }

  cancel() {
    this.location.back();
  }

}

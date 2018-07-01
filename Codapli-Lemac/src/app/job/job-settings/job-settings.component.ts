import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-settings',
  templateUrl: './job-settings.component.html',
  styleUrls: ['./job-settings.component.css']
})
export class JobSettingsComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      celda: [500, Validators.required],
      lvdt0: this.formBuilder.group({
        value: [1, Validators.required],
        isSelected: [true, Validators.required]
      }),
      lvdt1: this.formBuilder.group({
        value: [1, Validators.required],
        isSelected: [true, Validators.required]
      }),
      timeSelected: [1, Validators.required]
    });

  }

  ngOnInit() {
  }

  setLVDTS() {
    console.log(this.formGroup.value);
  }

}

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
          celda: ["", Validators.required],
          lvdt0: ['', Validators.required],
          lvdt1: ['',Validators.required],
          timeMuestra:['',Validators.required]
        });

   }

  ngOnInit() {
  }

}

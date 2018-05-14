import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  formGroup: FormGroup;
  valuesNow: any = { celda: 0, lvdt0: 0, lvdt1: 0 };
  socket: any;

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private jobService: JobsService,
    private router: Router) {
    this.formGroup = this.formBuilder.group({
      calibration_factor_celda: [null, Validators.required],
      calibration_factor_ldvt0: [null, Validators.required],
      calibration_factor_ldvt1: [null, Validators.required]
    });
  }

  ngOnInit() {

    this.socket = socketIo(`http://localhost:5001`);
    this.socket.on('arduino:setting', function (data) {
      console.log(data);
    }.bind(this));
  }

  submit(value: any): void {
    console.log(value);
  }

  cancel() {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import * as socketIo from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-settings',
  templateUrl: './job-settings.component.html',
  styleUrls: ['./job-settings.component.css']
})
export class JobSettingsComponent implements OnInit {

  formGroup: FormGroup;
  socket: any;

  celda: number;
  lvdt0: number;
  lvdt1: number;

  constructor(private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private toasterService: ToastrService) {


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

    this.socket = socketIo(`http://localhost:5001`);
    this.socket.on('arduino:settings_data', function (data) {

      this.celda = data.celda;
      this.lvdt0 = data.ldvt0;
      this.lvdt1 = data.lvdt1;

    }.bind(this));

    this.socket.on('arduino:settings_ok', function (data) {
      this.toasterService.success("Los datos fueron seteados correctamente","OK");
    }.bind(this));

    this.socket.on('arduino:settings_error', function (data) {
      this.toasterService.error("Los datos no pudieron ser seteados","Error");
    }.bind(this));

  }

  setLVDTS() {
    const setting = {
      lvdt0: this.formGroup.value.lvdt0,
      lvdt1: this.formGroup.value.lvdt1
    }

    this.settingsService.Setlvdts$(setting).subscribe(response => {
      console.log(response);
    });

  }

  setCelda() {
    this.settingsService.SetCelda$({ celda: this.formGroup.value.celda }).subscribe(response => {
      console.log(response);
    });
  }

  setTara() {
    this.settingsService.SetTara$().subscribe(response => {
      console.log(response);
    })
  }

  setIntervalWork() {
    this.settingsService.SetInterval$(this.formGroup.value.timeSelected).subscribe(response => {
      console.log(response);
    });
  }

}

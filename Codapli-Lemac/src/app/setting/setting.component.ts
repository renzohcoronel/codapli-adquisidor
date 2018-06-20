import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';
import { SettingsService } from '../services/settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  template: `
      <div class="container">
      <div class="col-md-12">
        <div class="row my-3">
          <h4>
            Configuracion del Equipo
          </h4>
        </div>
        <div class="row my-3">
          <div class="col-md-3">  
            <form [formGroup]="formGroup" (submit)="submit(formGroup.value)">
              <div class="form-group">
                <label for="calibration_factor_celda">Factor Celda</label>
                <input type="text" class="form-control" id="calibration_factor_celda" formControlName="calibration_factor_celda">     
                <div class="alert alert-danger" *ngIf="formGroup.get('calibration_factor_celda').invalid && formGroup.get('calibration_factor_celda').dirty">
                    "Debe ingresar este valor"
                </div>
              </div>
              <div class="form-group">
                <label for="tipoMuestra">Factor Calibracion LDVT 0</label>
                <input type="text" class="form-control" id="calibration_factor_ldvt0" formControlName="calibration_factor_ldvt0">
               
                <div class="alert alert-danger" *ngIf="formGroup.get('calibration_factor_ldvt0').invalid && formGroup.get('calibration_factor_ldvt0').dirty">
                    "Debe ingresar este valor"
                </div>
              </div>
              <div class="form-group">
                <label for="temperaturaEnsayo">Factor Calibracion LDVT 1</label>
                <input type="text" class="form-control" id="calibration_factor_ldvt1" formControlName="calibration_factor_ldvt1">
                
                <div class="alert alert-danger" *ngIf="formGroup.get('calibration_factor_ldvt1').invalid && formGroup.get('calibration_factor_ldvt1').dirty">
                    "Debe ingresar este valor"
                </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                    <button type="submit" class="btn btn-primary" [disabled]="!formGroup.valid">Guardar</button>
                  </div>
                  <div class="col-md-4">
                      <a class="btn btn-primary active" role="button" aria-pressed="true" (click)="cancel()">Cancelar</a>
                    </div>
              </div>
            </form>
          </div>
          <div class="col-md-6">
            <div class="row justify-content-center">
              <h5> Lectura actual del sensor </h5>
            </div>
            <div class="row justify-content-center">
              <div class="col-12">
              <ul>
                <li>Celda: {{valuesNow.celda}}</li>
                <li>LVDT0: {{valuesNow.lvdt0}} </li>
                <li>LVDT1: {{valuesNow.lvdt1}} </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SettingComponent implements OnInit {

  formGroup: FormGroup;
  valuesNow: any = { celda: 0, lvdt0: 0, lvdt1: 0 };
  socket: any;

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private toastService: ToastrService,
    private jobService: JobsService,
    private settingService: SettingsService,
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

    this.settingService.initSerialSetting().subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log('Error al iniciar el serial',error);
        this.toastService.error(error.error.message);
      }
    )

  }

  submit(value: any): void {
    console.log(value);
  }

  cancel() {
    this.location.back();
  }

}

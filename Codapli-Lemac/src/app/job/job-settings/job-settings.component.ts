import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import * as socketIo from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-settings',
  template: `

    <div class="row my-4 justify-content-center">
    <div class="col-md-12">
      <mat-card>
        <mat-card-title>Lecturas Actuales</mat-card-title>
        <mat-card-content>
          <app-lecturas
          [celda]="celda"
          [lvdt0]="lvdt0"
          [lvdt1]="lvdt1"
          ></app-lecturas>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 py-2">
      <mat-card>
        <mat-card-title>Celda</mat-card-title>
        <mat-card-content>
          <app-celda [formGroup]="formGroup"></app-celda>
        </mat-card-content>
        <mat-card-actions>
            <div class="row text-center">
                <div class="col-md-12">
                  <button class="btn btn-secondary" (click)="setTara()">Tara</button>
                  <button class="btn btn-secondary" (click)="setCelda()">Setear</button>
             </div>
            </div>
        </mat-card-actions>
      </mat-card>
    </div>
    <div class="col-md-6">
      <mat-card>
        <mat-card-title>LVDTs</mat-card-title>
        <mat-card-content>
          <app-lvdts [formGroup]="formGroup"></app-lvdts>
        </mat-card-content>
        <mat-card-actions>
          <div class="row text-center">
            <div class="col-md-12">
              <button class="btn btn-secondary" (click)="setLVDTS()">Setear</button>
            </div>
          </div>
        </mat-card-actions>
      </mat-card>
    </div>
  </div>

  `,
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
        value: [250, Validators.required],
        isSelected: [true, Validators.required]
      }),
      lvdt1: this.formBuilder.group({
        value: [250, Validators.required],
        isSelected: [true, Validators.required]
      })
    });

  }

  ngOnInit() {

    this.socket = socketIo(`http://localhost:5001`);
    this.socket.on('arduino:data', function (data) {

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
      console.log("Response LVDT",response);
    });

  }

  setCelda() {
    this.settingsService.SetCelda$({ celda: this.formGroup.value.celda }).subscribe(response => {
      console.log("Response CELDA",response);
    });
  }

  setTara() {
    this.settingsService.SetTara$().subscribe(response => {
      console.log("Response TARA",response);
    })
  }

  setIntervalWork() {
    this.settingsService.SetInterval$(this.formGroup.value.timeSelected).subscribe(response => {
      console.log(response);
    });
  }

}

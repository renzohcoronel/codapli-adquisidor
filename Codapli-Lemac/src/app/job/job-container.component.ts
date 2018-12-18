import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { Job } from '../models/job';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-container',
  template: `

        <div class="container">
        <div class="row pb-4">
          <div class="class col-md-12">
            <mat-horizontal-stepper [linear]="true" #stepper>
              <mat-step [stepControl]="ensayoTipoFromGroup">
                <ng-template matStepLabel>Tipo de Ensayo</ng-template>
                <app-job-type-selection (typeSelected)="setFormulario($event)" [fromGroup]="ensayoTipoFromGroup"></app-job-type-selection>
                <div class="row mt-5 text-right">
                    <div class="col-md-12">
                    <button mat-button matStepperNext class="btn btn-primary">Siguiente</button>
                  </div>
                </div>

              </mat-step>
              <mat-step [stepControl]="ensayoFormGroup">
                <ng-template matStepLabel>Datos</ng-template>
                <div class="row">
                  <div class="col-md-4">
                    <ng-container [ngSwitch]="ensayoTipoFromGroup.get('tipoEnsayo').value">
                      <app-job-aycf [formGroup]="ensayoFormGroup" *ngSwitchCase="'APERTURA_Y_CIERRE'"></app-job-aycf>
                      <app-job-rigidez [formGroup]="ensayoFormGroup" *ngSwitchCase="'MODULO_RIGIDEZ'"></app-job-rigidez>
                      <app-job-semiprobeta [formGroup]="ensayoFormGroup" *ngSwitchCase="'SEMI_PROBETA'"></app-job-semiprobeta>
                    </ng-container>
                  </div>
                </div>
                <div class="row mt-5 text-right">
                    <div class="col-md-12">
                  <button mat-button matStepperPrevious class="btn btn-primary">Atras</button>
                  <button mat-button matStepperNext class="btn btn-primary">Siguiente</button>
                </div>
                </div>
              </mat-step>
              <mat-step [stepControl]="settingFormGroup">
                <ng-template matStepLabel>Configuracion del equipo</ng-template>
                <app-job-settings></app-job-settings>
                <div class="row pt-2 pb-2 text-right">
                  <div class="col-md-12">

                    <button mat-button matStepperPrevious class="btn btn-primary">Atras</button>
                    <button mat-button (click)="Run()" class="btn btn-warning">Comenzar</button>
                  </div>
                </div>

              </mat-step>
            </mat-horizontal-stepper>
          </div>
        </div>
      </div>

  `,
  styleUrls: ['./job-container.component.css']
})
export class JobContainerComponent implements OnInit {
  ensayoTipoFromGroup: FormGroup;
  ensayoFormGroup: FormGroup;
  settingFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private jobService: JobsService,
    private settingsService:SettingsService,
    private router:Router) {

    this.ensayoTipoFromGroup = this.formBuilder.group({
      tipoEnsayo: [null, Validators.required],

    });
  }

  ngOnInit() {
    this.settingsService.initSerialSetting().subscribe(banana => {
    }, error => {
      console.log(error);
      this.toastService.error(error.error.message);
    });
  }

  ngOnDestroy(): void {
    this.settingsService.closeSerialSetting().subscribe(response => {
      console.log(response);
    });
  }

  setFormulario($event: string) {
    switch ($event) {
      case 'APERTURA_Y_CIERRE':
        this.ensayoFormGroup = this.formBuilder.group({
          alto: ["", Validators.required],
          ancho: ["", Validators.required],
          profundidad: ["", Validators.required],
          material: ["", Validators.required],
          temperatura: ["", Validators.required],
          recorridoPlaca: ["", Validators.required],
        });

        break;
      case 'MODULO_RIGIDEZ':
        this.ensayoFormGroup = this.formBuilder.group({
          material: ["", Validators.required],
          frecuencia: ["", Validators.required],
          alto: ["", Validators.required],
          ancho: ["", Validators.required],
          profundidad: ["", Validators.required],
          carga: ["", Validators.required],
          muestra: ["", Validators.required],
          temperatura: ["", Validators.required],
        });

        break;
      case 'SEMI_PROBETA':
        this.ensayoFormGroup = this.formBuilder.group({
          material: ["", Validators.required],
          diametro: ["", Validators.required],
          espesor: ["", Validators.required],
          ranura: ["", Validators.required],
          muestra: ["", Validators.required],
        });

        break;
      default:
        break;
    }
  }

  Run() {
    let job: any = this.ensayoFormGroup.value;
    job.tipoEnsayo = this.ensayoTipoFromGroup.get("tipoEnsayo").value;

    console.log("JOB --> ", job);
    this.jobService.postJob$(job).subscribe(
      reponse =>{
        console.log("Response PostJob", reponse);
        this.router.navigate(['job/experiment']);
      }
    )

  }

}

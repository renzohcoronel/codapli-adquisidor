
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as socketIo from 'socket.io-client';
import { isUndefined } from 'util';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-experiment',
  template: `
  <div class="container-fluid pb-4">
  <!-- Ambos graficos si son  -->
  <div class="row align-items-center">
    <div class="col-md-6">
      <div [hidden]="!forceChart">
        <canvas #force>{{ forceChart }}</canvas>
      </div>
    </div>
    <div class="col-md-6">
      <div [hidden]="!displacementChart">
        <canvas #displacement>{{ displacementChart }}</canvas>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12 text-center">
          <app-lecturas
          [cssClass]="'ul-inline'"
          [celda]="_celda"
          [lvdt0]="_lvdt0"
          [lvdt1]="_lvdt1">
          </app-lecturas>
    </div>
  </div>
  <div class="row mb-5">
    <div class="offset-md-3 col-md-6 align-items-center">
      <div class="row text-center">
        <div class="col-md-12">
          <h3>{{job?.tipoEnsayo}}</h3>
        </div>
      </div>
      <div class="row" *ngIf="job">
          <ng-container [ngSwitch]="job.tipoEnsayo">
              <app-list-detail-aycf [job]="job" [appCierre]="_appYCierre" *ngSwitchCase="'APERTURA_Y_CIERRE'"></app-list-detail-aycf>
              <app-list-detail-rigidez [job]="job" *ngSwitchCase="'MODULO_RIGIDEZ'"></app-list-detail-rigidez>
              <app-list-detail-semiprobeta [job]="job" *ngSwitchCase="'SEMI_PROBETA'"></app-list-detail-semiprobeta>
            </ng-container>
      </div>
      <div class="row mt-4 text-center">
      <div class="col-md-6 offset-md-3">
          <button class="btn btn-secondary" (click)="detener()">Detener</button>
        </div>
      </div>
    </div>
  </div>
`,
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {

  forceChart: any;
  displacementChart: any;
  @ViewChild('force') force: ElementRef;
  @ViewChild('displacement') displacement: ElementRef;
  socket: any;
  job: Job;

  times: Date[] = new Array();
  celda: Number[] = new Array();
  lvdt0: Number[] = new Array();
  lvdt1: Number[] = new Array();

  _celda: number;
  _lvdt0: number;
  _lvdt1: number;
  _appYCierre: number;

  constructor(private jobService: JobsService,
    private router: Router,
    private toastService: ToastrService) {
  }

  ngOnInit() {

    this.jobService.getJob$().subscribe(response => {
      this.job = response;
      this.jobService.startJob$().subscribe( response => {
            this.toastService.info(response.message);
          }, er => {
            console.log('Error Start Job', er);
            this.toastService.error(er.error.message);
          });

    }, er => {
      console.log('Error getJob', er);
      this.toastService.error(er.error.message);
    });


    this.socket = socketIo(`http://localhost:5001`);
    this.socket.on('arduino:graph_value', function (data) {
      this.times.push(data.time);
      this.celda.push(data.celda);
      this.lvdt0.push(data.lvdt0);
      this.lvdt1.push(data.lvdt1);
      this.forceChart.update();
      this.displacementChart.update();
    }.bind(this));

    this.socket.on('arduino:data', function (data) {
      this._lvdt0 = data.lvdt0;
      this._lvdt1 = data.lvdt1;
      this._celda = data.celda;
      this._appYCierre = data.apertura_y_cierre;

       // Logica de como
       if (this._celda > (data.celdaSet - 100) ) {
        this.alertService.alert('ATENCION CELDA PROXIMA A VALOR MAXIMO DE RESISTENCIA');
      } else {
        this.alertService.closeAlert();
      }

    }.bind(this));

    this.forceChart = new Chart(this.force.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.times,
        datasets: [{
          label: 'celda',
          backgroundColor: '#ffff',
          borderColor: 'red',
          fill: false,
          data: this.celda,
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            time: {
            unitStepSize: 0.1,
            tooltipFormat: "h:mm:ss a",
            scaleLabel: {
              display: true,
              labelString: "Time",
              fontColor: "red"
            }
          }
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });

    this.displacementChart = new Chart(this.displacement.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.times,
        datasets: [{
          label: 'ldvt0',
          backgroundColor: '#ffff',
          borderColor: 'blue',
          fill: false,
          data: this.lvdt0,
        }, {
          label: 'lvdt1',
          backgroundColor: '#ffff',
          borderColor: 'black',
          fill: false,
          data: this.lvdt1,
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            time: {
            unit: 'hour',
            unitStepSize: 0.1,
            round: 'hour',
            tooltipFormat: "h:mm:ss a",
            displayFormats: {
              hour: 'h:mm A'
            },
            scaleLabel: {
              display: true,
              labelString: "Time",
              fontColor: "red"
            }
          }
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });

    this.forceChart.update();
    this.displacementChart.update();
  }

  detener() {
    this.jobService.stopJob$().subscribe(response => {
      console.log("Stop Job", response);
      this.toastService.info(response.message);
      this.router.navigate(['jobs'])
    });
  }

}

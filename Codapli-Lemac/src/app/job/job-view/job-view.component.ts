
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as socketIo from 'socket.io-client';
import { isUndefined } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job-view',
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
  <div class="row mb-5">
    <div class="offset-md-3 col-md-6 align-items-center">
      <div class="row text-center">
        <div class="col-md-12">
          <h3>{{job?.tipoEnsayo}}</h3>
        </div>
      </div>
      <div class="row" *ngIf="job">
          <ng-container [ngSwitch]="job.tipoEnsayo">
              <app-list-detail-aycf [job]="job" *ngSwitchCase="'APERTURA_Y_CIERRE'"></app-list-detail-aycf>
              <app-list-detail-rigidez [job]="job" *ngSwitchCase="'MODULO_RIGIDEZ'"></app-list-detail-rigidez>
              <app-list-detail-semiprobeta [job]="job" *ngSwitchCase="'SEMI_PROBETA'"></app-list-detail-semiprobeta>
            </ng-container>
      </div>
      <div class="row mt-4 text-center">
      <div class="col-md-6 offset-md-3">
          <a class="btn btn-secondary" routerLink="/">Volver</a>
        </div>
      </div>
    </div>
  </div>
`,
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {

  forceChart: any;
  displacementChart: any;
  @ViewChild('force') force: ElementRef;
  @ViewChild('displacement') displacement: ElementRef;
  socket: any;
  job: Job;

  file: any;
  times: Date[] = new Array();
  celda: Number[] = new Array();
  lvdt0: Number[] = new Array();
  lvdt1: Number[] = new Array();

  _celda: number;
  _lvdt0: number;
  _lvdt1: number;

  constructor(private jobService: JobsService,
    private router: Router, private route: ActivatedRoute,
    private toastService: ToastrService) {
  }

  ngOnInit() {

    this.file = this.route.snapshot.paramMap.get('file');

    this.jobService.getJobForFile$(this.file).subscribe(resp => {
      console.log(resp);
      this.celda = resp.celdas;
      this.lvdt1 = resp.lvdt1;
      this.lvdt0 = resp.lvdt0;
      this.times = resp.times;

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
          fill: true,
          data: this.lvdt0,
        }, {
          label: 'lvdt1',
          backgroundColor: '#ffff',
          borderColor: 'black',
          fill: true,
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

    });
  }




}
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as socketIo from 'socket.io-client';
import { JobComponent } from '../job/job.component';
import { JobsService } from '../services/jobs.service';
import { isUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  template: 
  `
  <div class="container pb-5">
  <div class="row align-items-center">
    <div class="col-md-12">
      <div [hidden]="!chart">
        <canvas #canvas>{{ chart }}</canvas>
      </div>

    </div>
  </div>
  <div class="row p-3">
    <div class="col-md-12">
        <div class="row">
           Fecha: {{job.fecha | date : 'dd/MM/yyyy'}}
        </div>
      <div class="row">
          Desplazamiento Impuesto: {{job.desplazamientImpueso}}
      </div>
      <div class="row">
        Tipo de Muestra: {{job.tipoMuestra}}
      </div>
      <div class="row">
        Temperatura (°C): {{job.temperaturaEnsayo}}
      </div>
    </div>
  </div>
  
  <div class="row p-3 mx-auto text-center">
    <div class="col-md-4 p-1">
      <button type="button" class="btn btn-primary" [disabled]="isStartJob" (click)="startJob()">Comenzar</button>
    </div>
    <div class="col-md-4 p-1">
      <button type="button" class="btn btn-primary" (click)="stopJob()">Detener</button>
    </div>
  </div>

</div>
  
  `
})
export class TestComponent implements OnInit {

  chart: any;
  @ViewChild('canvas') canvas: ElementRef;
  socket: any;
  job: any = { registrando: false };
  isStartJob: Boolean = false;

  times: Date[] = new Array();
  celda: Number[] = new Array();
  lvdt0: Number[] = new Array();
  lvdt1: Number[] = new Array();



  constructor(private jobService: JobsService, private router: Router) {
  }

  ngOnInit() {

    console.log(this.times === null ? true : false);

    this.jobService.getJob$().subscribe(response => {
      console.log(response);
      this.job = response;
    });


    this.socket = socketIo(`http://localhost:5001`);
    this.socket.on('arduino:data', function (data) {
      this.times.push(data.time);
      this.celda.push(data.celda);
      this.lvdt0.push(data.ldvt0);
      this.lvdt1.push(data.lvdt1);
      this.chart.update();
    }.bind(this));

    console.log(this.canvas);
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.times,
        datasets: [{
          label: 'celda',
          backgroundColor: '#ffff',
          borderColor: 'red',
          fill: false,
          data: this.celda,
        }, {
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
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
    this.chart.update();
  }

  startJob(): void {
    this.jobService.startJob$().subscribe(response => {
      console.log(response);
      this.isStartJob = true;
    });
  }

  stopJob(): void {
    this.jobService.stopJob$().subscribe(response => {
      console.log(response);
      this.isStartJob = false;
      this.router.navigate(['jobs']);
    });
  }

}

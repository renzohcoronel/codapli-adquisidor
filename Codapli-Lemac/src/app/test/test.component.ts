import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as socketIo from 'socket.io-client';
import { JobComponent } from '../job/job.component';
import { JobsService } from '../services/jobs.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
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



  constructor(private jobService: JobsService) {
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
          data: [1, 2.2, 2.4, 4, 3.2, 1.2],
        }, {
          label: 'lvdt1',
          backgroundColor: '#ffff',
          borderColor: 'black',
          fill: false,
          data: this.lvdt0,
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
    });
  }

}

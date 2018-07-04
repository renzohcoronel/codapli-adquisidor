
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as socketIo from 'socket.io-client';
import { isUndefined } from 'util';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from '../../../services/jobs.service';
import { Job } from '../../../models/job';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
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



  constructor(private jobService: JobsService,
    private router: Router,
    private toastService: ToastrService) {
  }

  ngOnInit() {

    this.jobService.getJob$().subscribe(response => {
      this.job = response;

          this.jobService.startJob$().subscribe(response => {
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
    this.socket.on('arduino:data', function (data) {
      this.times.push(data.time);
      this.celda.push(data.celda);
      this.lvdt0.push(data.ldvt0);
      this.lvdt1.push(data.lvdt1);

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

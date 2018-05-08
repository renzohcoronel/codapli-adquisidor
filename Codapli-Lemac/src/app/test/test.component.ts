import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  chart: any;
  @ViewChild('canvas') canvas: ElementRef;

  constructor() { }

  ngOnInit() {

    console.log(this.canvas);
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'celda',
          backgroundColor: '#ffff',
          borderColor: 'red',
          fill: false,
          data: [1, 2, 4, 5, 6, 7],
        }, {
          label: 'ldvt0',
          backgroundColor: '#ffff',
          borderColor: 'blue',
          fill: false,
          data: [1, 2.2, 2.4, 4, 3.2, 1.2],
        }, {
          label: 'lvdt1',
          backgroundColor: '#ffff',
          borderColor: 'red',
          fill: false,
          data: [2, 4, 5, 2, 3, 4],
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
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

}

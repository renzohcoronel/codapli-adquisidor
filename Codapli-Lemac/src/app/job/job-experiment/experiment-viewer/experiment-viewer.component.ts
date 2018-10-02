import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-experiment-viewer',
    template: 
    `
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
            <button class="btn btn-secondary" (click)="detener()">Detener</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  ` 
})

export class ExperimentViewerComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
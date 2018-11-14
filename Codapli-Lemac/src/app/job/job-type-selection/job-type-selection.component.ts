import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-type-selection',
  template:`
  <div class="row">
  <div class="col-md-4">
    <mat-card 
    (click)="selectedItem('SEMI_PROBETA')"
    [ngClass]="{'selected' : selected==='SEMI_PROBETA', 'not-selected' : !(selected==='SEMI_PROBETA')}">
      <mat-card-title >Semi-probeta </mat-card-title>
    </mat-card>
  </div>
  <div class="col-md-4">
    <mat-card 
    [ngClass]="{'selected' : selected==='MODULO_RIGIDEZ', 'not-selected' : !(selected==='MODULO_RIGIDEZ')}"
    (click)="selectedItem('MODULO_RIGIDEZ')">
      <mat-card-title>Modulo Rigidez</mat-card-title>
    </mat-card>
  </div>
  <div class="col-md-4">
    <mat-card 
    [ngClass]="{'selected' : selected==='APERTURA_Y_CIERRE', 'not-selected' : !(selected==='APERTURA_Y_CIERRE')}"
      (click)="selectedItem('APERTURA_Y_CIERRE')">
      <mat-card-title>Apertura y cierre </mat-card-title>
    </mat-card>
  </div>
</div>
  
  `,
  styleUrls: ['./job-type-selection.component.css']
})
export class JobTypeSelectionComponent implements OnInit {

  selected: String;
  @Input() fromGroup: FormGroup
  @Output() typeSelected: EventEmitter<String> = new EventEmitter<String>();
  
  constructor() { }

  ngOnInit() {
  }

  selectedItem(value:String){
    this.selected = value;
    this.typeSelected.emit(value);
    this.fromGroup.get('tipoEnsayo').setValue(value);
    console.log("Tipo de ensayo",this.fromGroup.value);
  }

}

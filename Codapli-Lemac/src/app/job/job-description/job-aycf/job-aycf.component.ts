import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-aycf',
  template: `
  <form [formGroup]="formGroup">
  <div class="form-group">
    <label for="alto">Alto</label>
    <input type="text" class="form-control" id="alto" formControlName="alto">
    <div class="alert alert-danger" *ngIf="formGroup.get('alto').invalid && formGroup.get('alto').dirty">
      "Debe ingresar este valor"
    </div>
  </div>
  <div class="form-group">
    <label for="ancho">Ancho</label>
    <input type="text" class="form-control" id="ancho" formControlName="ancho">
    <div class="alert alert-danger" *ngIf="formGroup.get('ancho').invalid && formGroup.get('ancho').dirty">
      "Debe ingresar este valor"
    </div>
  </div>
  <div class="form-group">
    <label for="profundidad">Profundidad</label>
    <input type="text" class="form-control" id="profundidad" formControlName="profundidad">
    <div class="alert alert-danger" *ngIf="formGroup.get('profundidad').invalid && formGroup.get('profundidad').dirty">
      "Debe ingresar este valor"
    </div>
  </div>
  <div class="form-group">
    <label for="material">Material</label>
    <input type="text" class="form-control" id="material" formControlName="material">
    <div class="alert alert-danger" *ngIf="formGroup.get('material').invalid && formGroup.get('material').dirty">
      "Debe ingresar este valor"
    </div>
  </div>
  <div class="form-group">
    <label for="temperatura">Temperatura (°C)</label>
    <input type="text" class="form-control" id="temperatura" formControlName="temperatura">
    <div class="alert alert-danger" *ngIf="formGroup.get('temperatura').invalid && formGroup.get('temperatura').dirty">
      "Debe ingresar este valor"
    </div>
  </div>
  <div class="form-group">
    <label for="recorridoPlaca">Recorrido Placa</label>
    <input type="text" class="form-control" id="recorridoPlaca" formControlName="recorridoPlaca">
    <div class="alert alert-danger" *ngIf="formGroup.get('recorridoPlaca').invalid && formGroup.get('recorridoPlaca').dirty">
      "Debe ingresar este valor"
    </div>
  </div>
</form>
  
  `,
  styleUrls: ['./job-aycf.component.css']
})
export class JobAycfComponent implements OnInit {
  @Input() formGroup: FormGroup;
  
  constructor() { }

  ngOnInit() {
    console.log("Formulario AyCF");
  }

}

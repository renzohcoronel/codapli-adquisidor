import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-rigidez',
  template:`
      <form [formGroup]="formGroup">
      <div class="form-group">
        <label for="dimensiones">Dimensiones</label>
        <input type="text" class="form-control" id="dimensiones" formControlName="dimensiones">
        <div class="alert alert-danger" *ngIf="formGroup.get('dimensiones').invalid && formGroup.get('dimensiones').dirty">
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
        <label for="carga">Carga</label>
        <input type="text" class="form-control" id="carga" formControlName="carga">
        <div class="alert alert-danger" *ngIf="formGroup.get('carga').invalid && formGroup.get('carga').dirty">
          "Debe ingresar este valor"
        </div>
      </div>
      <div class="form-group">
        <label for="frecuencia">Frecuencia</label>
        <input type="text" class="form-control" id="frecuencia" formControlName="frecuencia">
        <div class="alert alert-danger" *ngIf="formGroup.get('frecuencia').invalid && formGroup.get('frecuencia').dirty">
          "Debe ingresar este valor"
        </div>
      </div>
      <div class="form-group">
        <label for="muestra">Muestra</label>
        <input type="text" class="form-control" id="muestra" formControlName="muestra">
        <div class="alert alert-danger" *ngIf="formGroup.get('muestra').invalid && formGroup.get('muestra').dirty">
          "Debe ingresar este valor"
        </div>
      </div>
    </form>
    
  `,
  styleUrls: ['./job-rigidez.component.css']
})
export class JobRigidezComponent implements OnInit {
  
  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
    console.log("Formulario rigidez");
  }

}

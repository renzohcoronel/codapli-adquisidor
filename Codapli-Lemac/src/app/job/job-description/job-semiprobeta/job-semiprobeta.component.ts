import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-semiprobeta',
  template: `
      <form [formGroup]="formGroup">
      <div class="form-group">
        <label for="muestra">Muestra</label>
        <input type="text" class="form-control" id="muestra" formControlName="muestra">
        <div class="alert alert-danger" *ngIf="formGroup.get('muestra').invalid && formGroup.get('muestra').dirty">
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
        <label for="diametro">Diametro</label>
        <input type="text" class="form-control" id="diametro" formControlName="diametro">
        <div class="alert alert-danger" *ngIf="formGroup.get('diametro').invalid && formGroup.get('diametro').dirty">
          "Debe ingresar este valor"
        </div>
      </div>
      <div class="form-group">
        <label for="espesor">Espesor</label>
        <input type="text" class="form-control" id="espesor" formControlName="espesor">
        <div class="alert alert-danger" *ngIf="formGroup.get('espesor').invalid && formGroup.get('espesor').dirty">
          "Debe ingresar este valor"
        </div>
      </div>
      <div class="form-group">
        <label for="ranura">Ranura</label>
        <input type="text" class="form-control" id="ranura" formControlName="ranura">
        <div class="alert alert-danger" *ngIf="formGroup.get('ranura').invalid && formGroup.get('ranura').dirty">
          "Debe ingresar este valor"
        </div>
      </div>
    </form>


  `,
  styleUrls: ['./job-semiprobeta.component.css']
})
export class JobSemiprobetaComponent implements OnInit {

  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
    console.log("Formulario semiprobeta");
  }

}

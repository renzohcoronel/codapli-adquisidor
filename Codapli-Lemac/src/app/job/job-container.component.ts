import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-container',
  templateUrl: './job-container.component.html',
  styleUrls: ['./job-container.component.css']
})
export class JobContainerComponent implements OnInit {
  ensayoTipoFromGroup: FormGroup;
  ensayoFormGroup: FormGroup;
  settingFormGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
   
    this.ensayoTipoFromGroup =  this.formBuilder.group({
      tipoEnsayo: [null, Validators.required],
     
    });
     
    this.ensayoFormGroup = this.formBuilder.group({
      frecuencia: [null, Validators.required],
      desplazamiento: [null, Validators.required],
      material: [null, Validators.required],
      diametro: [null, Validators.required],
      espesor: [null, Validators.required],
      ranura: [null, Validators.required],
      carga: [null, Validators.required],
      dimensiones: [null, Validators.required],
      muestra: [null, Validators.required],
      temperatura: [null, Validators.required],
      recorridoPlaca: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

}

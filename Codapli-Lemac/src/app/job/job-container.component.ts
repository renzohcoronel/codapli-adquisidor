import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from '../services/jobs.service';
import { Job } from '../models/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-container',
  templateUrl: './job-container.component.html',
  styleUrls: ['./job-container.component.css']
})
export class JobContainerComponent implements OnInit {
  ensayoTipoFromGroup: FormGroup;
  ensayoFormGroup: FormGroup;
  settingFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private jobService: JobsService,
    private router:Router) {

    this.ensayoTipoFromGroup = this.formBuilder.group({
      tipoEnsayo: [null, Validators.required],

    });

    // this.ensayoFormGroup = this.formBuilder.group({
    //   frecuencia: [""],
    //   desplazamiento: [""],
    //   material: [""],
    //   diametro: [""],
    //   espesor: [""],
    //   ranura: [""],
    //   carga: [""],
    //   dimensiones: [""],
    //   muestra: [""],
    //   temperatura: [""],
    //   recorridoPlaca: [""],
    // });
  }

  ngOnInit() {
  }

  setFormulario($event: string) {
    switch ($event) {
      case 'APERTURA_Y_CIERRE':
        this.ensayoFormGroup = this.formBuilder.group({
          dimensiones: ["", Validators.required],
          material: ["", Validators.required],
          temperatura: ["", Validators.required],
          recorridoPlaca: ["", Validators.required],
        });

        break;
      case 'MODULO_RIGIDEZ':
        this.ensayoFormGroup = this.formBuilder.group({
          material: ["", Validators.required],
          frecuencia: ["", Validators.required],
          dimensiones: ["", Validators.required],
          carga: ["", Validators.required],
          muestra: ["", Validators.required],
          temperatura: ["", Validators.required],
        });

        break;
      case 'SEMI_PROBETA':
        this.ensayoFormGroup = this.formBuilder.group({
          material: ["", Validators.required],
          diametro: ["", Validators.required],
          espesor: ["", Validators.required],
          ranura: ["", Validators.required],
          muestra: ["", Validators.required],
        });

        break;
      default:
        break;
    }
  }

  Run() {
    let job: any = this.ensayoFormGroup.value;
    job.tipoEnsayo = this.ensayoTipoFromGroup.get("tipoEnsayo").value;

    console.log("JOB --> ", job);
    this.jobService.postJob$(job).subscribe(
      reponse =>{
        console.log("Response PostJob", reponse);
        this.router.navigate(['job/experiment']);
      }
    )
   
  }

}

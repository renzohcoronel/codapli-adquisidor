import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private jobService: JobsService,
    private router: Router) {
    this.formGroup = this.formBuilder.group({
      desplazamientImpueso: [null, Validators.required],
      tipoMuestra: [null, Validators.required],
      temperaturaEnsayo: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  submit(value: any): void {
    console.log(value);
    this.jobService.postJob$(value).subscribe(reponse => {
      this.router.navigate(['/test']);
    });
  }

  cancel() {
    this.location.back();
  }

}

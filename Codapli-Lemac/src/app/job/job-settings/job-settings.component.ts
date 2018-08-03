import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-job-settings',
  templateUrl: './job-settings.component.html',
  styleUrls: ['./job-settings.component.css']
})
export class JobSettingsComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private settingsService: SettingsService) {


    this.formGroup = this.formBuilder.group({
      celda: [500, Validators.required],
      lvdt0: this.formBuilder.group({
        value: [1, Validators.required],
        isSelected: [true, Validators.required]
      }),
      lvdt1: this.formBuilder.group({
        value: [1, Validators.required],
        isSelected: [true, Validators.required]
      }),
      timeSelected: [1, Validators.required]
    });

  }

  ngOnInit() {
  }

  setLVDTS() {
    const setting = { 
      lvdt0: this.formGroup.value.lvdt0,
      lvdt1: this.formGroup.value.lvdt1
    }
  
    this.settingsService.Setlvdts$(setting).subscribe(response => {
        console.log(response);
    });

  }
  setCelda() {
    this.settingsService.SetCelda$({ celda: this.formGroup.value.celda}).subscribe(response => {
        console.log(response);
    });
  }
  setTara() {
    this.settingsService.SetTara$().subscribe(response => {
      console.log(response);
    })
  }

}

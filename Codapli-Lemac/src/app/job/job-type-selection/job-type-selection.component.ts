import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-type-selection',
  templateUrl: './job-type-selection.component.html',
  styleUrls: ['./job-type-selection.component.css']
})
export class JobTypeSelectionComponent implements OnInit {

  selected: String;
  @Input() fromGroup: FormGroup
  
  constructor() { }

  ngOnInit() {
  }

  selectedItem(value:String){
    this.selected = value;
    this.fromGroup.get('tipoEnsayo').setValue(value);
    console.log("Tipo de ensayo",this.fromGroup.value);
  }

}

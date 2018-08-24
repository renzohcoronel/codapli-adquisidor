import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-type-selection',
  templateUrl: './job-type-selection.component.html',
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

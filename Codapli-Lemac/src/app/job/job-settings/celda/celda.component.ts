import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-celda',
  template: `
    <div class="row">
    <div class="col-md-6">
      <form [formGroup]="formGroup">
        <div class="form-group">
          <label for="celda">Celda</label>
            <select class="form-control" id="celda" formControlName="celda" class="custom-select">
                <option [ngValue]="500">500Kg</option>
                <option [ngValue]="1000">1000Kg</option>
                <option [ngValue]="2000">2000Kg</option>
              </select>
        </div>
      </form>
    </div>
  </div>

  `,
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent implements OnInit {

  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}

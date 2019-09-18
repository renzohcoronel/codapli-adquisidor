import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-lvdts",
  template: `
    <div class="row">
      <div class="col-md-12">
        <form [formGroup]="formGroup">
          <div class="row">
            <div class="col-md-6">

            <div class="form-group" formGroupName="lvdt0">
              <label for="value">LVDT1</label>
              <select
                class="form-control"
                id="value"
                formControlName="value"
                class="custom-select"
              >
                <option [ngValue]="50">-2.5mm : 2.5mm</option>
              </select>
            </div>
            </div>
            <div class="col-md-6">
            <div class="form-group" formGroupName="lvdt1">
              <label for="value">LVDT2</label>
              <select
                class="form-control"
                id="value"
                formControlName="value"
                class="custom-select"
              >
              <option [ngValue]="50">-2.5mm : 2.5mm</option>
              </select>
            </div>
            </div>
            </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ["./lvdts.component.css"]
})
export class LvdtsComponent implements OnInit {
  @Input() formGroup: FormGroup;
  //@Input() dataLvdt: any;
  constructor() {}

  ngOnInit() {}
}

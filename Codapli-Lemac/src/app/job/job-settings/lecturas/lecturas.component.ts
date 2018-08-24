import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lecturas',
  templateUrl: './lecturas.component.html',
  styleUrls: ['./lecturas.component.css']
})
export class LecturasComponent implements OnInit {
  @Input() celda:any;
  @Input() lvdt0:any;
  @Input() lvdt1:any;
  constructor() { }

  ngOnInit() {

   
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  template: `
    <div class="container-fluid">
      <div class="row "  >
        <nav class="navbar fixed-top navbar-expand-lg ml-auto  bg-lemac">  
              <img class="img-fluid" alt="Responsive image" [src]="'assets/images/lemac.png'">     
        </nav>
      </div>
    </div>
  `,
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

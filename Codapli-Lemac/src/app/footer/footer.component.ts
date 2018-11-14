import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
      <div class="container-fluid">
      <div class="row" >
        <nav class="navbar  fixed-bottom navbar-expand-lg ml-auto bg-lemac">
          <div class="navbar-collapse justify-content-center" >
            <ul class="navbar-nav">
              
              <li class="nav-item">
                <span class="navbar-text m-0 p-0" style="font-size: 14px;">
                  © 2018 Codapli
                </span>
                
              </li>
            </ul>
            
          </div>
        </nav>
      </div>
    </div>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

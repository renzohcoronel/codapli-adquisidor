import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-menu-bar></app-menu-bar>
    <app-alert></app-alert>
    <router-outlet></router-outlet>
    <app-footer> </app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

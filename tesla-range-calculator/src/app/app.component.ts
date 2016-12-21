import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `<header class="header">
      <img [src]="logo">
    </header>
    <div class="wrapper">
      <tesla-battery></tesla-battery>
    </div>`
})
export class AppComponent {
  logo: string = 'assets/logo.svg';
}

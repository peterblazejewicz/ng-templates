import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `<header class="header">
      <img [src]="logo">
    </header>
    <div class="wrapper">

    </div>`
})
export class AppComponent {
  logo: string = 'assets/logo.svg';
}

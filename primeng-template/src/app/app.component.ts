import { Component } from '@angular/core';

@Component({
  selector: 'png-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'png works!';
  startDate: Date = new Date();
  endDate: Date = new Date();
}

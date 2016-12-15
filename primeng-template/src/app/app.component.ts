import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'png-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'png works!';
  startDate: Date = new Date();
  endDate: Date = new Date();
  pieChartData: any;
  doughnutChartData: any;
  polarChartData: any;

  ngOnInit(): void {
    this.pieChartData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
    };
    this.doughnutChartData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
    };
    this.polarChartData = {
      datasets: [{
        data: [
          11,
          16,
          7,
          3,
          14
        ],
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#E7E9ED',
          '#36A2EB'
        ],
        label: 'My dataset'
      }],
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ]
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { GlobalService } from 'src/app/services/global.service';
import * as Chart from 'chart.js';
import { faChartBar, faChartLine, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faChartBar = faChartBar;
  faChartLine = faChartLine;
  faTable = faTable;

  chart:any; // This will hold our chart info

  chartActive: [boolean, boolean, boolean, boolean];
  metersData = [
    {

      label: 'Dataset 1',
      data: [
        11,
        13,
        8,
        10,
        7,
        6,
        9,
        12,
        9,
        9,
        5,
        20
      ]
    }, {
      label: 'Dataset 2',
      data: [
        11,
        22,
        10,
        6,
        7,
        3,
        15,
        12,
        12,
        14,
        9,
        5
      ]
    }, {
      label: 'Dataset 3',
      data: [
        8,
        6,
        20,
        11,
        20,
        13,
        9,
        11,
        13,
        7,
        3,
        15
      ]
    }

    //{ data: this.serieA, label: this.selectedMeasureType + ' A', fill: false, lineTension: 0},
    //{ data: this.serieB, label: this.selectedMeasureType + ' B', fill: false, lineTension: 0},
    //{ data: this.serieC, label: this.selectedMeasureType + ' C', fill: false, lineTension: 0}
  ];

  // For chartjs
  tsLabels;
  chartjs: boolean;
  chart1: Chart;
  chart1Type;
  barChartColors: any = [
    "#5c90aa",
    "#a7c1d3",
    "#4e5151",
    "#916458",
    "#ee964b",
    "#a9d0ea",
    "#a7c957",
    "#f2e8cf",
  ];
  borderChartColors: any = [
    "#336b87",
    "#90afc5",
    "#2a3132",
    "#763626",
    "#d38d51",
    "#a2cae4",
    "#91b43d",
    "#d3cbb7",
  ];
  public barChartType: ChartType;
  public barChartLegend: boolean;
  public barChartLabels: Label[];
  public barChartOptions: ChartOptions;
  public barChartData: ChartDataSets[];
  metersValues: unknown[];


  isActive:[boolean,boolean,boolean,boolean]; // Tipo de parámetro activado?


  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    
    this.getMeasureRangeChart("San%20Salvador");
  }


  public getMeasureRangeChart(city: string): void {
    this.chartActive = [true, false, false, false];

    switch (city) {
      case "San%20Salvador":
        this.isActive = [
          true,
          false,
          false,
          false,
        ];
        break;
      case "Guatemala":
        this.isActive = [
          false,
          true,
          false,
          false,
        ];
        break;
      case "Tegucigalpa":
        this.isActive = [
          false,
          false,
          true,
          false,
        ];
        break;
      case "Managua":
        this.isActive = [
          false,
          false,
          false,
          true
        ];
        break;
      default:
        this.isActive = [
          true,
          false,
          false,
          false,
        ];
        break;
    }

    // Chart (re)initialize, to prevent double load on changing date range or views
    if (this.chart != undefined) {
      this.chart.destroy();
    }
    this.chart = undefined;

    this.globalService.getForecast(city)
      .subscribe(res => {
        this.chartjs = true;
        console.log(res);

        let temp_max = res.map(res => res.main.temp_max);
        let temp_min = res.map(res => res.main.temp_min);
        let alldates = res.map(res => res.dt)
        
        let weatherDates = []
        alldates.forEach((res) => {
            let jsdate = new Date(res * 100)
            weatherDates.push(jsdate.toLocaleTimeString('es', { month: 'short', day: 'numeric' }))
        })

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                data: temp_max,
                borderColor: "#3cba9f",
                fill: false,
                label: "Temperatura maxima"
              },
              { 
                data: temp_min,
                borderColor: "#ffcc00",
                fill: false,
                label: "Temperatura minima"
              },
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

      })
    
    
  }


  changeGraphicType(type:string){}

  changeToTable(){}

}

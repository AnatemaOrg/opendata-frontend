import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { GlobalService } from 'src/app/services/global.service';
import * as Chart from 'chart.js';
import { faChartBar, faChartLine, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  faChartBar = faChartBar;
  faChartLine = faChartLine;
  faTable = faTable;



  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    
  }



}

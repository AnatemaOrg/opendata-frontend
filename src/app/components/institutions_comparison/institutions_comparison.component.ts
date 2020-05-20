import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { GlobalService } from 'src/app/services/global.service';
import * as Chart from 'chart.js';
import { faChartBar, faChartLine, faTable } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { formatDate, DatePipe } from "@angular/common";
import * as $ from "jquery";


@Component({
  selector: 'app-institutions_comparison',
  templateUrl: './institutions_comparison.component.html',
  styleUrls: ['./institutions_comparison.component.scss']
})
export class InstitutionsComparisonComponent implements OnInit {


  constructor(private globalService: GlobalService) { }

  //@ViewChild("baseChart") chartParties: BaseChartDirective;

  ngOnInit(): void {

  }



}

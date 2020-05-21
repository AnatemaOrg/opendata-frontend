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
import { Institution } from "@app/models/institution"
  import { from } from 'rxjs';

@Component({
  selector: 'app-institutions_comparison',
  templateUrl: './institutions_comparison.component.html',
  styleUrls: ['./institutions_comparison.component.scss']
})
export class InstitutionsComparisonComponent implements OnInit {

  colCompareLeft: Institution;
  colCompareRight: Institution;

  institutionSelection1;
  institutionSelection2;
  institutionList: any;

  average_response1:any  = "";
  total_inforequest1:any = "";
  total_status1:any = [];
  total_result1:any = [];

  average_response2:any  = "";
  total_inforequest2:any = "";
  total_status2:any;
  total_result2:any;

  constructor(private globalService: GlobalService) { }

  //@ViewChild("baseChart") chartParties: BaseChartDirective;

  ngOnInit(): void {
    this.globalService.getInstitutionCatalog().subscribe( res => {
      this.institutionList = res;
    })
  }

  onChangeInstitution1(event: any){
    this.institutionSelection1 = event.target.value;
    if(this.institutionSelection1 == "") return 
    this.globalService.getInstitutions().subscribe(res => {
      this.colCompareLeft = res["data"].filter(obj => { return obj.id === this.institutionSelection1} )
      this.average_response1 = this.colCompareLeft[0]["attributes"]["average-response"];
      this.total_inforequest1 = this.colCompareLeft[0]["attributes"]["total-inforequest"];
      //this.total_status1 = this.colCompareLeft[0]["attributes"]["total-status"];
      //this.total_result1 = this.colCompareLeft[0]["attributes"]["total-result"];
    });
  }

  onChangeInstitution2(event: any){
    this.institutionSelection2 = event.target.value;
    if(this.institutionSelection1 == "") return 
    this.globalService.getInstitutions().subscribe(res => {
      this.colCompareRight = res["data"].filter(obj => { return obj["id"] === this.institutionSelection2})
      this.average_response2 = this.colCompareRight[0]["attributes"]["average-response"];
      this.total_inforequest2 = this.colCompareRight[0]["attributes"]["total-inforequest"];
      //this.total_status2 = this.colCompareRight[0]["attributes"]["total-status"];
      //this.total_result2 = this.colCompareRight[0]["attributes"]["total-result"];
    });
  }

}

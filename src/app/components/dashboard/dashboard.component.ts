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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faChartBar = faChartBar;
  faChartLine = faChartLine;
  faTable = faTable;

  chart:any; 
  chartParties:any; 
  chartFastAnswer:any;
  chartSlowAnswer:any;
  chartComplaintsAnswer:any;

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

  // Chartjs
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
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartLabels: Label[];
  barChartOptions: ChartOptions;
  barChartData: ChartDataSets[];

  partiesChartType: ChartType;
  partiesChartLegend:boolean;
  partiesChartLabels: Label[];
  partiesChartOptions: ChartOptions;
  partiesChartData: ChartDataSets[];

  fastAnswerChartType: ChartType;
  fastAnswerChartLegend:boolean;
  fastAnswerChartLabels: Label[];
  fastAnswerChartOptions: ChartOptions;
  fastAnswerChartData: ChartDataSets[];

  slowAnswerChartType: ChartType;
  slowAnswerChartLegend:boolean;
  slowAnswerChartLabels: Label[];
  slowAnswerChartOptions: ChartOptions;
  slowAnswerChartData: ChartDataSets[];

  complaintsAnswerChartType: ChartType;
  complaintsAnswerChartLegend:boolean;
  complaintsAnswerChartLabels: Label[];
  complaintsAnswerChartOptions: ChartOptions;
  complaintsAnswerChartData: ChartDataSets[];

  metersValues: unknown[];


  isActive:[boolean,boolean,boolean,boolean]; // Tipo de parámetro activado?
  chart1exists: boolean;
  fLabels: any[];
  listInstitutions: any;
  assetID: any;

  tableData: any;
  showTable: boolean;
  displayedColumns: any;
  tableData2: any[];
  dataSource = new MatTableDataSource(this.tableData2);
  dataSourcePrint = new MatTableDataSource(this.tableData2);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  totalRequests = "-";
  totalCompleteAnswer = "-";
  totalNoAnswer = "-";
  totalComplaints = "-";
  aLabels;
  institutionID: string;
  dataInfoRequest: any;
  dataLabelRequest: any;

  constructor(private globalService: GlobalService) { }

  //@ViewChild("baseChart") chartParties: BaseChartDirective;

  ngOnInit(): void {
    // TEST
    this.institutionID = "123"; // Default que traiga info de Presidencia
    this.getMeasureRangeChart(this.institutionID);
    
    this.globalService.getTotals().subscribe( res => {
      this.totalRequests = res["total_inforequests"];
      this.totalCompleteAnswer = res["total_irresults"]["Respuesta completa"];
      this.totalNoAnswer = res["total_irresults"]["Sin respuesta"];
      this.totalComplaints = res["total_infocomplains"];


      // Grafico para las apelaciones
      
      let labelsA = [];
      let complaintsResponseData = []
      
      labelsA =  
        ["Desistimiento","No definido","Favorable","No competente","Parcial","Desfavorable"]
      /*
      this.complaintsAnswerChartData = [
        {
          label: 'Desistimiento',
          backgroundColor: "#ff0000",
          data: [
            res["total_icresults"]["Desistimiento"],0,0,0,0,0
          ],
        },
        {
          label: 'No definido',
          backgroundColor: "#2E499C",
          data: [
            0,res["total_icresults"]["No definido"],0,0,0,0
          ],
        },
        {
          label: 'Favorable',
          backgroundColor: "#2E499C",
          data: [
            0,0,res["total_icresults"]["Favorable"],0,0,0
          ],
        },
        {
          label: 'Oficina no competente',
          backgroundColor: "#2E499C",
          data: [
            0,0,0,res["total_icresults"]["Oficina no competente"],0,0
          ],
        },
        {
          label: 'Parcial',
          backgroundColor: "#2E499C",
          data: [
            0,0,0,0,res["total_icresults"]["Parcial"],0
          ],
        },
        {
          label: 'Desfavorable',
          backgroundColor: "#2E499C",
          data: [
            0,0,0,0,0,res["total_icresults"]["Desfavorable"]
          ],
        }
      ]; */

      complaintsResponseData.push(
        
          res["total_icresults"]["Desistimiento"],
          res["total_icresults"]["No definido"],
          res["total_icresults"]["Favorable"],
          res["total_icresults"]["Oficina no competente"],
          res["total_icresults"]["Parcial"],
          res["total_icresults"]["Desfavorable"]
        
  
      )
      
      console.log(labelsA);
      console.log(complaintsResponseData);
      
      this.aLabels = labelsA;
      this.chartComplaintsAnswer = new Chart('canvas-mini-2', {
        type: 'bar',
        data: {
          labels: this.aLabels,
          datasets: [
            {
              label: "Total ",
              data: complaintsResponseData,
              backgroundColor: "#F4F1DE",
              borderColor: "#e2ddbc"
            }
          ]
        },
        options: {
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
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

    });

    // Endpoint para obtener informacion necesaria para graficar informacion de las instituciones en general
    this.globalService.getInstitutions().subscribe( res => {
      
      // Listado de instituciones para el dropdown
      this.listInstitutions = res["data"];

      // Seteamos una institucion por defecto para el grafico (CAPRES)
      if (this.assetID == undefined) {
        this.assetID = this.listInstitutions.find(object => object["id"] == "123").id;
      }

      //
      // Obtener la informacion para las graficas (variables)
      //

      let fmln = res["data"].find(obj => obj.id == 83);
      let gana = res["data"].find(obj => obj.id == 84);
      let arena = res["data"].find(obj => obj.id == 34);
      let cd = res["data"].find(obj => obj.id == 43);
      let pcn = res["data"].find(obj => obj.id == 120);
      let pdc = res["data"].find(obj => obj.id == 121);

      let maxCharLength = 40; // Para instituciones con nombres demasiado largos

      // Coleccion de IDs de los partidos
      let partiesIDs = ["83", "84", "34", "43", "120", "121"]

      // Listado general sin los partidos politicos
      let listWithoutParties = res["data"].filter(function(obj) {
        return partiesIDs.indexOf(obj.id) === -1;
      });

      // Se quita las instituciones que estan registradas, pero no tienen solicitudes de informacion
      listWithoutParties = listWithoutParties
        .filter(function(obj) {
          return obj["attributes"]["total-inforequest"] > 0;
        });


      // Listado de las instituciones que responden rapido
      let fastResponse =
          listWithoutParties
          .sort((a, b) => parseInt(a["attributes"]["average-response"]) - parseInt(b["attributes"]["average-response"]))
          .slice(0,9);

      // Listado de las instituciones que responden leeento
      let slowResponse = 
          listWithoutParties
          .sort((a, b) => parseInt(a["attributes"]["average-response"]) - parseInt(b["attributes"]["average-response"]))
          .reverse().slice(0,9);


      // Grafico para los partidos politicos 
      this.partiesChartLegend = true;
      this.partiesChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            stacked: false
          }],
          yAxes: [{
            stacked: false
          }]
        }
      };
      this.partiesChartData = [
        {
          label: 'ARENA',
          backgroundColor: "#2E499C",
          data: [
            arena["attributes"]["average-response"]
          ],
        }, {
          label: 'CD',
          backgroundColor: "#FFE007",
          data: [
            cd["attributes"]["average-response"]
          ],
        }, {
          label: 'FMLN',
          backgroundColor: "#ff0000",
          data: [
            fmln["attributes"]["average-response"]
          ],
        }, {
          label: 'GANA',
          backgroundColor: "#64CCC9",
          data: [
            gana["attributes"]["average-response"]
          ],
        }, {
          label: 'PCN',
          backgroundColor: "#1837B4",
          data: [
            pcn["attributes"]["average-response"]
          ],
        }, {
          label: 'PDC',
          backgroundColor: "#00732E",
          data: [
            pdc["attributes"]["average-response"]
          ],
        }
      ];
      this.tsLabels = ['Tiempo promedio en dias calendario'];
      this.chartParties = new Chart('canvas-mini-1', {
        type: 'bar',
        data: {
          labels: this.tsLabels,
          datasets: this.partiesChartData,
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

      // Grafico para el top 10 de instituciones que responden mas rapido
      this.fastAnswerChartLegend = true;
      this.fastAnswerChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            stacked: false
          }],
          yAxes: [{
            stacked: false
          }]
        }
      };
      let fastResponseKeys = Object.keys(fastResponse);
      let fastResponseValues = Object.values(fastResponse);
      let labelsF = [];
      let fastResponseData = []

      for (let propF in fastResponseKeys){
        let labelString = fastResponseValues[propF]["attributes"]["name"]

        labelsF.push(
          labelString.length > maxCharLength ? labelString.substr(0, maxCharLength) + "..." : labelString
        )
        if (fastResponseValues[propF]["attributes"]["average-response"] == 0){
          fastResponseData.push(0.5)
        }
        else {
          fastResponseData.push(fastResponseValues[propF]["attributes"]["average-response"])
        }
      }
      this.fLabels = labelsF;
      this.chartFastAnswer = new Chart('canvas-mini-3', {
        type: 'horizontalBar',
        data: {
          labels: this.fLabels,
          datasets: [{
            label: "Dias promedio",
            data: fastResponseData,
            backgroundColor: "#BFD8CB"
          }]
        },
        
        options: {
          elements: {
						rectangle: {
							borderWidth: 2,
						}
					},
          responsive: true,
          scales: {
            xAxes: [{
              stacked: false,
              ticks: {
                beginAtZero:true,
                mirror:false,
                suggestedMin: 0,
                suggestedMax: 2.5
              } 
            }],
            yAxes: [{
              stacked: false
            }]
          }
        },
        
      });

      // TO DO: Crear una sola funcion de graficar para ahorrar codigo :/
      // Grafico para el top 10 de instituciones que responden mas rapido
      this.slowAnswerChartLegend = true;
      this.slowAnswerChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            stacked: false
          }],
          yAxes: [{
            stacked: false
          }]
        }
      };
      let slowResponseKeys = Object.keys(slowResponse);
      let slowResponseValues = Object.values(slowResponse);
      let labelsS = [];
      let slowResponseData = []

      for (let propF in slowResponseKeys){
        let labelString = slowResponseValues[propF]["attributes"]["name"]

        labelsS.push(
          labelString.length > maxCharLength ? labelString.substr(0, maxCharLength) + "..." : labelString
        )
        if (slowResponseValues[propF]["attributes"]["average-response"] == 0){
          slowResponseData.push(0.5)
        }
        else {
          slowResponseData.push(slowResponseValues[propF]["attributes"]["average-response"])
        }
      }
      this.fLabels = labelsS;
      this.chartSlowAnswer = new Chart('canvas-mini-4', {
        type: 'horizontalBar',
        data: {
          labels: this.fLabels,
          datasets: [{
            label: "Dias promedio",
            data: slowResponseData
          }]
        },
        options: {
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
        }
      });
    });

  }


  public getMeasureRangeChart(institutionID: string): void {
    this.chartActive = [true, false, false, false];


    // Chart (re)initialize, to prevent double load on changing date range or views
    if (this.chart != undefined) {
      this.chart.destroy();
    }
    this.chart = undefined;

    this.globalService.getRequestsTotalsByInstitution(institutionID).subscribe( res => {
      console.log(res);
      console.log("get data")
      console.log(res.map(res => res.inforequests))

      this.chartjs = true;

      this.tableData = [];

      this.dataInfoRequest = res.map(res => res.inforequests);
      this.dataLabelRequest = res.map(res => `${res.month}-${res.year}`);


      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.dataLabelRequest,
          datasets: [
            { 
              data: this.dataInfoRequest,
              borderColor: "#3D405B",
              fill: false,
              label: "Total de solicitudes"
            },
            
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,              
            }],
          }
        }
      });
      this.chart1exists = true;
    });

    this.globalService.getForecast("Soyapango")
      .subscribe(res => {
        this.chartjs = true;

        this.tableData = [];

        let temp_max = res.map(res => res.main.temp_max);
        let temp_min = res.map(res => res.main.temp_min);
        let alldates = res.map(res => res.dt)
        
        let weatherDates = []
        alldates.forEach((res) => {
            let jsdate = new Date(res * 100)
            weatherDates.push(jsdate.toLocaleTimeString('es', { month: 'short', day: 'numeric' }))
        })
        /* 
        this.barChartLabels = this.metersValues[0]["data"]
        .map(obj =>
          formatDate(obj.dateMin, "HH:mm ", "es-Es", "-0600")
        )
        .reverse();
          */
         
        this.tableData.push({ headers: "Total solicitudes por institucion" });
        this.tableData.push({
          headers: "Fecha/Hora",
          dataValues: this.barChartLabels
        });
        this.tableData.reverse();
        for (let v in Object.keys(this.tableData)) {
          //this.displayedColumns.push(this.tableData[v]["headers"]);
        }
        //this.tableData2 = this.array1;
        console.log(this.tableData2)
        /*
        if (this.tableData2 == undefined) {
          $(".no-data").css("visibility", "visible");
          $(".chart-container").css("visibility", "hidden");
        } else {
          $(".no-data").css("visibility", "hidden");
          $(".chart-container").css("visibility", "visible");
        }*/

        //this.dataSource.data = this.tableData2;
        //this.dataSource.paginator = this.paginator;
        this.showTable = false;

        
      })
    
    
  }

  onChangeObj(event: any) {
    this.institutionID = event.target.value;
    let tempAsset = this.listInstitutions.find(object => object["id"] == this.institutionID);
    this.getMeasureRangeChart(this.institutionID);
    /*
    if (tempAsset["meters_installed"].length > 0) {
      this.metersInstalled = true;
      this.getMeasureRangeChart(this.view, this.initialDate, this.assetID);
    }*/
  }

  changeDataSet(endpoint: string){}

  changeGraphicType(type:string){}

  // Change visualization type to table view
  changeToTable() {
    let table = document.getElementById("toogleTable");
    let chart = document.getElementById("chart-wrapper");
    this.chartActive = [false, false, false, true];
    chart.style.display = "none";
    table.style.display = "block";
  }
  

}

import { Component, OnInit } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import * as XLSX from 'xlsx';
//Importamos Chartjs
import Chart from 'chart.js/auto';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // Variable para la fecha y hora
  actualizationHour = new Date().toISOString();
  // Variables para los números de formularios
  cacn_number = 0;
  ce_number = 0;
  cea_number = 0;
  total_number_of_forms = 0;
  //Variable para indicar loading
  isLoading = true;
  isLoadingGraphdata = false;
  //Variables para la gráfica de tendencias
  graphInfo = this.fb.group({
    tipo_de_corral:null,
    nombre_de_corral:null
  });
  nombres_de_corrales = [];
  //Arreglo de colores para la gráfica
  colores_de_porcentajes:string[] = [];
  chartJsonData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: '% calificación',
      data: [0,0,0,0,0,0,0,0,0,0,0,0],
      backgroundColor: this.colores_de_porcentajes,
      borderColor: this.colores_de_porcentajes
    }]
  };
  //Data de la gráfica de incumplimiento
  incumplimientoChartJsonData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets:[
      {
        label: 'CACN(%)',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        borderColor: 'rgba(193,66,66, 0.8)',
        backgroundColor: 'rgba(193,66,66, 0.8)',
      },
      {
        label: 'CE(%)',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        borderColor: 'rgba(70,191,63, 0.8)',
        backgroundColor: 'rgba(70,191,63, 0.8)',
      },
      {
        label: 'CEA(%)',
        data:[0,0,0,0,0,0,0,0,0,0,0,0],
        borderColor: 'rgba(255, 99, 32, 0.8)',
        backgroundColor: 'rgba(255, 99, 32, 0.8)',
      }
    ]
  }
  myChart:any;
  myChart2:any;
  //Variables para la tabla de incumplimientos
  incumplimientos_cacn = [];
  incumplimientos_cea = [];
  incumplimientos_ce = [];
  
  constructor(private _mongodb:MongodbService, private fb:FormBuilder) {
    this.getNumberOfForms();
  }

  ngOnInit(): void {
    //Consultamos los incumplimientos
    this.getIncumplimientosByCorral();
    //Iniciamos cargando la gráfica de porcentajes de cumplimiento
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: this.chartJsonData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max:100
          }
        }
      }
    });
    //Iniciamos cargando la gráfica de porcentajes de incumplimiento
    this.myChart2 = new Chart('myChart2', {
      type: 'line',
      data: this.incumplimientoChartJsonData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max:50
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Porcentaje de incumplimientos'
          }
        }
      }
  });
  //Cargamos los datos de la gráfica de porcentajes de incumplimiento
  this.generateGraphIncumplimientos();
}
  
  // Función para obtener la cantidad de formularios almacenados hasta el momento
  async getNumberOfForms(){
   let result:any = await this._mongodb.getForms();
   this.isLoading = false;
   this.cacn_number = result.forms_historical.cacn_forms.length;
   this.ce_number = result.forms_historical.ce_forms.length;
   this.cea_number = result.forms_historical.cea_forms.length;
   this.total_number_of_forms = this.cacn_number + this.ce_number + this.cea_number;
  }
  //Función para generar excel de tendecias en zona SUR
  async generateExcelTendencias() {
    let excelData = await this._mongodb.getInfoExcelTendencias();
    let ws_data_cacn = excelData.ws_data_cacn;
    let ws_data_ce = excelData.ws_data_ce;
    let ws_data_cea = excelData.ws_data_cea;
    /* create a new blank workbook */
    var wb = XLSX.utils.book_new();
    /* make worksheets */
    var ws_cacn = XLSX.utils.aoa_to_sheet(ws_data_cacn);
    var ws_ce = XLSX.utils.aoa_to_sheet(ws_data_ce);
    var ws_cea = XLSX.utils.aoa_to_sheet(ws_data_cea);
    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(wb, ws_cacn, 'CACN');
    XLSX.utils.book_append_sheet(wb, ws_ce, 'CE');
    XLSX.utils.book_append_sheet(wb, ws_cea, 'CEA');
    XLSX.writeFile(wb, 'TENDENCIAS.xlsx');
  }
  //Función para generar gráfica de tendencias dependiendo de la zona
  async filterByCorralType(){
    this.isLoadingGraphdata = true;
    this.nombres_de_corrales = [];
    let corralNames:any = await this._mongodb.getCorralNamesByCorralType(this.graphInfo.value.tipo_de_corral);
    this.nombres_de_corrales = corralNames.corrales;
    this.isLoadingGraphdata = false;
  }

  //Función para actualizar gráfica de tendencias
  async generateGraph(){
    this.isLoadingGraphdata = true;
    //Obtenemos los valores a consultar
    let corralName = this.graphInfo.value.nombre_de_corral;
    let corralType = this.graphInfo.value.tipo_de_corral;
    this.colores_de_porcentajes = [];
    let result = await this._mongodb.getInfoGraphTendencias(corralType, corralName);
    this.isLoadingGraphdata = false;
    let iterator = result.data;
    //A partir de aqui debo agarrar los datos de la gráfica
    let data = [iterator[1] == '-'? 0:parseFloat(iterator[1].split('%')[0]), iterator[2] == '-'? 0:parseFloat(iterator[2].split('%')[0]), iterator[3] == '-'? 0:parseFloat(iterator[3].split('%')[0]), iterator[4] == '-'? 0:parseFloat(iterator[4].split('%')[0]), iterator[5] == '-'? 0:parseFloat(iterator[5].split('%')[0]), iterator[6] == '-'? 0:parseFloat(iterator[6].split('%')[0]), iterator[7] == '-'? 0:parseFloat(iterator[7].split('%')[0]), iterator[8] == '-'? 0:parseFloat(iterator[8].split('%')[0]), iterator[9] == '-'? 0:parseFloat(iterator[9].split('%')[0]), iterator[10] == '-'? 0:parseFloat(iterator[10].split('%')[0]), iterator[11] == '-'? 0:parseFloat(iterator[11].split('%')[0]),iterator[12] == '-'? 0:parseFloat(iterator[12].split('%')[0])];
    //Definimos los colores de acuerdo al porcentaje
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element >= 0 && element <= 59){
        this.colores_de_porcentajes.push('rgba(255, 66, 71, 1)');
      }
      if(element > 59 && element <= 74){
        this.colores_de_porcentajes.push('rgba(255, 131, 71,1)');
      }
      if(element > 74 && element <= 99){
        this.colores_de_porcentajes.push('rgba(255, 203, 71,1)');
      }
      if(element > 99 && element <= 100){
        this.colores_de_porcentajes.push('rgba(60, 179, 113, 1)');
      }
    }
    this.chartJsonData.datasets[0].data = data;
    this.chartJsonData.datasets[0].backgroundColor = this.colores_de_porcentajes;
    this.chartJsonData.datasets[0].borderColor = this.colores_de_porcentajes;
    this.myChart.update();
  }

  //Función para generar gráfica de porcentaje de incumplimientos
  async generateGraphIncumplimientos(){
    let percents = await this._mongodb.getInfoGraphPorcentajeIncumplimiento();
    let cacn = percents.cacn;
    let ce = percents.ce;
    let cea = percents.cea;
    this.incumplimientoChartJsonData.datasets[0].data = cacn;
    this.incumplimientoChartJsonData.datasets[1].data = ce;
    this.incumplimientoChartJsonData.datasets[2].data = cea;
    this.myChart2.update();
  }

  //Función para obtener los incumplimientos por corral
  async getIncumplimientosByCorral(){
    this.incumplimientos_cacn = await this._mongodb.getIncumplimientosCACN();
    this.incumplimientos_ce = await this._mongodb.getIncumplimientosCE();
    this.incumplimientos_cea = await this._mongodb.getIncumplimientosCEA();
  }
}

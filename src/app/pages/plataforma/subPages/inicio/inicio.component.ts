import { Component, OnInit } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import * as XLSX from 'xlsx';
//Importamos Chartjs
import Chart from 'chart.js/auto';
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
  //Variables para la gráfica de tendencias
  tipo_de_corral = null;
  nombres_de_corrales = [];
  nombre_corral_elegido = null;
  chartJsonData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: '% calificación',
      data: [0,0,0,0,0,0,0,0,0,0,0,0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };
  myChart:any;
  
  constructor(private _mongodb:MongodbService) {
    this.getNumberOfForms();
  }

  ngOnInit(): void {
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: this.chartJsonData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
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
    console.log(this.tipo_de_corral);
    let excelData = await this._mongodb.getInfoGraphTendencias();
    let ws_data_cacn = excelData.ws_data_cacn;
    let ws_data_ce = excelData.ws_data_ce;
    let ws_data_cea = excelData.ws_data_cea;
    if(this.tipo_de_corral == 'CACN'){
      this.nombres_de_corrales = ws_data_cacn;
    }
    if(this.tipo_de_corral == 'CE'){
      this.nombres_de_corrales = ws_data_ce;
    }
    if(this.tipo_de_corral == 'CEA'){
      this.nombres_de_corrales = ws_data_cea;
    }
    console.log(this.nombres_de_corrales);
  }

  //Función para actualizar gráfica de tendencias
  async generateGraph(){
    let prueba = '15.27%';
    let iterator:string[] = [];
    console.log(parseFloat(prueba.split('%')[0]));
    for await ( iterator of this.nombres_de_corrales) {
      if (iterator[0] == this.nombre_corral_elegido){
        let data = [iterator[1] == '-'? 0:parseFloat(iterator[1].split('%')[0]), iterator[2] == '-'? 0:parseFloat(iterator[2].split('%')[0]), iterator[3] == '-'? 0:parseFloat(iterator[3].split('%')[0]), iterator[4] == '-'? 0:parseFloat(iterator[4].split('%')[0]), iterator[5] == '-'? 0:parseFloat(iterator[5].split('%')[0]), iterator[6] == '-'? 0:parseFloat(iterator[6].split('%')[0]), iterator[7] == '-'? 0:parseFloat(iterator[7].split('%')[0]), iterator[8] == '-'? 0:parseFloat(iterator[8].split('%')[0]), iterator[9] == '-'? 0:parseFloat(iterator[9].split('%')[0]), iterator[10] == '-'? 0:parseFloat(iterator[10].split('%')[0]), iterator[11] == '-'? 0:parseFloat(iterator[11].split('%')[0]),iterator[12] == '-'? 0:parseFloat(iterator[12].split('%')[0])];
        console.log(data);
        this.chartJsonData.datasets[0].data = data;
        this.myChart.update();
      } 
    }
  }
}

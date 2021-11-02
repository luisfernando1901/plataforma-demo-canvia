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
  //Arreglo de colores para la gráfica
  colores_de_porcentajes:string[] = [];
  chartJsonData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: '% calificación',
      data: [0,0,0,0,0,0,0,0,0,0,0,0],
      backgroundColor: this.colores_de_porcentajes,
      borderColor: this.colores_de_porcentajes,
      borderWidth: 1
    }]
  };
  myChart:any;
  
  constructor(private _mongodb:MongodbService) {
    this.getNumberOfForms();
  }

  ngOnInit(): void {
    //Iniciamos cargando la gráfica
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
    this.colores_de_porcentajes = [];
    let iterator:string[] = [];
    console.log(parseFloat(prueba.split('%')[0]));
    for await ( iterator of this.nombres_de_corrales) {
      if (iterator[0] == this.nombre_corral_elegido){
        let data = [iterator[1] == '-'? 0:parseFloat(iterator[1].split('%')[0]), iterator[2] == '-'? 0:parseFloat(iterator[2].split('%')[0]), iterator[3] == '-'? 0:parseFloat(iterator[3].split('%')[0]), iterator[4] == '-'? 0:parseFloat(iterator[4].split('%')[0]), iterator[5] == '-'? 0:parseFloat(iterator[5].split('%')[0]), iterator[6] == '-'? 0:parseFloat(iterator[6].split('%')[0]), iterator[7] == '-'? 0:parseFloat(iterator[7].split('%')[0]), iterator[8] == '-'? 0:parseFloat(iterator[8].split('%')[0]), iterator[9] == '-'? 0:parseFloat(iterator[9].split('%')[0]), iterator[10] == '-'? 0:parseFloat(iterator[10].split('%')[0]), iterator[11] == '-'? 0:parseFloat(iterator[11].split('%')[0]),iterator[12] == '-'? 0:parseFloat(iterator[12].split('%')[0])];
        console.log(data);
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
    }
  }
}

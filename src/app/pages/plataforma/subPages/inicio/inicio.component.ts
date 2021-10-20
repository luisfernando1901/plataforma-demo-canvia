import { Component, OnInit } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import * as XLSX from 'xlsx';
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
  constructor(private _mongodb:MongodbService) {
    this.getNumberOfForms();
  }

  ngOnInit(): void {
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
  //Función para generar excel de tendecias en zona CENTRO
  generateExcelCentro() {

  }
  //Función para generar excel de tendecias en zona NORTE
  generateExcelNorte() {

  }
}

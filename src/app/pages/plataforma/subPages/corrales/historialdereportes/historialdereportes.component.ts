import { Component, OnInit } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import { PdfgeneratorService } from 'src/app/services/pdfgenerator/pdfgenerator.service';

@Component({
  selector: 'app-historialdereportes',
  templateUrl: './historialdereportes.component.html',
  styleUrls: ['./historialdereportes.component.css']
})
export class HistorialdereportesComponent implements OnInit {
  searchValue = '';
  templateFormularios = {};
  tableloadingIndicator = true;
  visibleFolio = false;
  visibleTipoCorral = false;
  visibleNombreCorral = false;
  visiblePropietario = false;
  visibleFechaCaptura = false;
  visibleRealizadoPor = false;
  listOfData = [
    {
      folio: '-',
      general_info: {
        region: '-',
        tipoDeCorral: '-',
        fechaDeCaptura: '-',
        infoCliente: {
          NOMBRE: '-',
          PROPIETARIO: '-',
        }
      },
      surveyTaker:'-'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  constructor(private _mongodb: MongodbService,private pdfGenerator: PdfgeneratorService) { }

  ngOnInit() {
    this.getFormsRepository();
  }

  //Folio
  resetFolio(): void {
    this.searchValue = '';
    this.searchFolio();
  }

  searchFolio(): void {
    this.visibleFolio = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.folio.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }
  //Tipo de corral
  resetTipoCorral(): void {
    this.searchValue = '';
    this.searchTipoCorral();
  }

  searchTipoCorral(): void {
    this.visibleTipoCorral = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.general_info.tipoDeCorral.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }
  //Nombre de corral
  resetNombreCorral(): void {
    this.searchValue = '';
    this.searchNombreCorral();
  }

  searchNombreCorral(): void {
    this.visibleNombreCorral = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.general_info.infoCliente.NOMBRE.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }
  //Propietario
  resetPropietario(): void {
    this.searchValue = '';
    this.searchPropietario();
  }

  searchPropietario(): void {
    this.visiblePropietario = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.general_info.infoCliente.PROPIETARIO.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }
  //Fecha de captura
  resetFechaCaptura(): void {
    this.searchValue = '';
    this.searchFechaCaptura();
  }

  searchFechaCaptura(): void {
    this.visibleFechaCaptura = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.general_info.fechaDeCaptura.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }

  //Realizado por
  resetRealizadoPor(): void {
    this.searchValue = '';
    this.searchRealizadoPor();
  }

  searchRealizadoPor(): void {
    this.visibleRealizadoPor = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.surveyTaker.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }

  async getFormsRepository() {
    var forms_array:any = [];
    var result: any = await this._mongodb.getForms();
    await this.getFormsTemplates();
    console.log(result);
    //Obtenemos CACN
    var CACN_array = result.forms_historical.cacn_forms;
    //Obtenemos CE
    var CE_array = result.forms_historical.ce_forms;
    //Obtenemos CEA
    var CEA_array = result.forms_historical.cea_forms;
    this.listOfData = forms_array.concat(CACN_array,CE_array,CEA_array);
    this.resetFolio();
    this.tableloadingIndicator = false;
  }

  async getFormsTemplates() {
    this.templateFormularios = await this._mongodb.queryForms();
    console.log(this.templateFormularios);
  }

  getPDF(i:number) {
    let formAnswers = this.listOfDisplayData[i];
    let type = formAnswers.general_info.tipoDeCorral;
    console.log(formAnswers);
    this.pdfGenerator.generatePdf(formAnswers,this.templateFormularios,type);
  }

}

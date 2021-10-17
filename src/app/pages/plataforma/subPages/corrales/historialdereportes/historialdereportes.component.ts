import { Component, OnInit } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';

@Component({
  selector: 'app-historialdereportes',
  templateUrl: './historialdereportes.component.html',
  styleUrls: ['./historialdereportes.component.css']
})
export class HistorialdereportesComponent implements OnInit {
  searchValue = '';
  visibleFolio = false;
  visibleTipoCorral = false;
  visibleNombreCorral = false;
  visiblePropietario = false;
  visibleFechaCaptura = false;
  listOfData = [
    {
      folio: 'John Brown',
      region: 32,
      tipo_de_corral: 'New York No. 1 Lake Park',
      nombre_del_corral: 'NOmbre del corral',
      propietario: 'Luisfer',
      fecha_de_captura: '05/08/2021'
    },
    {
      folio: 'Jim Green',
      region: 42,
      tipo_de_corral: 'London No. 1 Lake Park',
      nombre_del_corral: 'NOmbre del corral',
      propietario: 'Luisfer',
      fecha_de_captura: '05/08/2021'

    },
    {
      folio: 'Joe Black',
      region: 32,
      tipo_de_corral: 'Sidney No. 1 Lake Park',
      nombre_del_corral: 'NOmbre del corral',
      propietario: 'Luisfer',
      fecha_de_captura: '05/08/2021'

    },
    {
      folio: 'Jim Red',
      region: 32,
      tipo_de_corral: 'London No. 2 Lake Park',
      nombre_del_corral: 'NOmbre del corral',
      propietario: 'Luisfer',
      fecha_de_captura: '05/08/2021'

    },
    {
      folio: 'John Brown',
      region: 32,
      tipo_de_corral: 'New York No. 1 Lake Park',
      nombre_del_corral: 'NOmbre del corral',
      propietario: 'Luisfer',
      fecha_de_captura: '05/08/2021'
    },
    {
      folio: 'Jim Green',
      region: 42,
      tipo_de_corral: 'London No. 1 Lake Park',
      nombre_del_corral: 'NOmbre del corral',
      propietario: 'Luisfer',
      fecha_de_captura: '05/08/2021'

    },
    {
      folio: 'Joe Black',
      region: 32,
      tipo_de_corral: 'Sidney No. 1 Lake Park',
      nombre_del_corral: 'NOmbre del corral',
      propietario: 'Luisfer',
      fecha_de_captura: '05/08/2021'

    },
    {
      folio: 'Jim Red',
      region: 32,
      tipo_de_corral: 'London No. 2 Lake Park',
      nombre_del_corral: 'NOmbre del corral',
      propietario: 'Luisfer',
      fecha_de_captura: '05/08/2021'

    }
  ];
  listOfDisplayData = [...this.listOfData];
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
    this.listOfDisplayData = this.listOfData.filter((item) => item.tipo_de_corral.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }
  //Nombre de corral
  resetNombreCorral(): void {
    this.searchValue = '';
    this.searchNombreCorral();
  }

  searchNombreCorral(): void {
    this.visibleNombreCorral = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.nombre_del_corral.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }
  //Propietario
  resetPropietario(): void {
    this.searchValue = '';
    this.searchPropietario();
  }

  searchPropietario(): void {
    this.visiblePropietario = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.propietario.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }
  //Fecha de captura
  resetFechaCaptura(): void {
    this.searchValue = '';
    this.searchFechaCaptura();
  }

  searchFechaCaptura(): void {
    this.visibleFechaCaptura = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.fecha_de_captura.indexOf(this.searchValue) !== -1);
    console.log(this.listOfDisplayData);
  }
  constructor(private _mongodb: MongodbService) { }

  ngOnInit() {
    this.getFormsRepository();
  }

  async getFormsRepository() {
    var result = await this._mongodb.getForms();
    console.log(result);
  }

}

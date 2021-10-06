import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';

@Component({
  selector: 'app-nuevoformulario',
  templateUrl: './nuevoformulario.component.html',
  styleUrls: ['./nuevoformulario.component.css']
})
export class NuevoformularioComponent implements OnInit {
  //Variables
  location = [
    {
      region: 'SUR',
    },
    {
      region: 'CENTRO',
    },
    {
      region: 'NORTE',
    }
  ];
  tipoDeCorral = [
    {
      tipo: 'CACN',
    },
    {
      tipo: 'CE',
    },
    {
      tipo: 'CEA',
    }
  ];
  directoryData:any;
  directoryDataFiltered: object[] = [];
  //Formularios
  generalInfoForm = this.fb.group({
    region: [],
    tipoDeCorral: [],
    nombre: []
  });

  constructor(private fb: FormBuilder, private _mongodb: MongodbService) { }

  ngOnInit(): void {
  }

  //Función que se activa cada vez que se cambia el dropdown de Region
  async querySelectedRegionDirectory() {
    let regionValue = this.generalInfoForm.value['region'];
    if (regionValue != null) {
      let results: any = await this._mongodb.queryRegion(regionValue);
      this.directoryData = results;
      console.log(this.directoryData);
      this.filterByCorralType();
    }
    else{
      this.directoryDataFiltered = [];
      this.generalInfoForm.patchValue({tipoDeCorral:null});
    }
  }
  //Función que filtra la búsqueda por tipo de corral
  filterByCorralType() {
    let filteredResults: object[] = [];
    if (this.generalInfoForm.value['tipoDeCorral'] != null && this.generalInfoForm.value['region'] != null) {
      let type = this.generalInfoForm.value['tipoDeCorral'];
      console.log(type);
      this.directoryData.results.forEach((single: directoryDataType) => {
        let corralType = single.TIPO_DE_CORRAL.split(' ')[0];
        if (type == corralType) {
          filteredResults.push(single);
        }
      });
      this.directoryDataFiltered = filteredResults;
      console.log(filteredResults);
    }
    else{
      this.directoryDataFiltered = [];
    }
  }
}

interface directoryDataType {
  _id: string,
  TIPO_DE_CORRAL: string,
  NOMBRE: string,
  PROPIETARIO: string,
  DIRECCION: string,
  MUNICIPIO: string,
  PSG: string,
  LATITUD: number,
  LONGITUD: number
}

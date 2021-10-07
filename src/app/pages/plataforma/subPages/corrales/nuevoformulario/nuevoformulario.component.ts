import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import { FormArray } from '@angular/forms';

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
  directoryData: any;
  directoryDataFiltered: object[] = [];
  cantidadDeVariables = 0;
  //Formularios
  generalInfoForm = this.fb.group({
    region: [],
    tipoDeCorral: [],
    infoCliente: [],
    TIPO_DE_CORRAL: [],
    NOMBRE: [],
    PROPIETARIO: [{ value: '', disabled: true }],
    DIRECCION: [{ value: '', disabled: true }],
    MUNICIPIO: [{ value: '', disabled: true }],
    PSG: [{ value: '', disabled: true }],
    LATITUD: [{ value: '', disabled: true }],
    LONGITUD: [{ value: '', disabled: true }],
  });
  //Dinamic forms
  answersForm = this.fb.group({
    answers: this.fb.array([])
  });

  get answers() {
    return this.answersForm.controls["answers"] as FormArray;
  }

  addAnswersData(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [''],
        observaciones: [''],
        observacionesDelMedico: [''],
        fechaDeCumplimiento: [''],
      });
      this.answers.push(answerData);
    }
  }
  //Variables que son de prueba nomas
  prueba = {
    "seccion1": [
      {
        "titulo": "PRIMERA SECCION - INSTALACIONES",
        "cantidadDePreguntas": 5,
        "questionario": [
          {
            "pregunta": "1.- Un corral de Acopio de Consumo Nacional deberá consistir de todo el CACN, no están permitidas otras PSG o UPP dentro del mismo predio.",
            "respuestas": {
              "1": ["Opera con su PSG"],
              "0": ["Hay otra PSG en el CACN", "Hay una UPP en el CACN"]
            }
          },
          {
            "pregunta": "2.- Un corral de Acopio de Consumo Nacional deberá consistir de todo el CACN, no están permitidas otras PSG o UPP dentro del mismo predio.",
            "respuestas": {
              "1": ["Opera con su PSG"],
              "0": ["Hay otra PSG en el CACN", "Hay una UPP en el CACN"]
            }
          }
        ]
      }
    ],
    "seccion2": [
      {
        "titulo": "SEGUNDA SECCION - INSTALACIONES",
        "cantidadDePreguntas": 5,
        "questionario": [
          {
            "pregunta": "1.- Un corral de Acopio de Consumo Nacional deberá consistir de todo el CACN, no están permitidas otras PSG o UPP dentro del mismo predio.",
            "respuestas": {
              "1": ["Opera con su PSG"],
              "0": ["Hay otra PSG en el CACN", "Hay una UPP en el CACN"]
            }
          },
          {
            "pregunta": "2.- Un corral de Acopio de Consumo Nacional deberá consistir de todo el CACN, no están permitidas otras PSG o UPP dentro del mismo predio.",
            "respuestas": {
              "1": ["Opera con su PSG"],
              "0": ["Hay otra PSG en el CACN", "Hay una UPP en el CACN"]
            }
          }
        ]
      }
    ]

  }

  constructor(private fb: FormBuilder, private _mongodb: MongodbService) { }

  ngOnInit(): void {
    this.cantidadDeVariables = this.prueba.seccion1[0].cantidadDePreguntas;
    this.addAnswersData(this.cantidadDeVariables);
    console.log(this.answersForm.value);
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
    else {
      this.directoryDataFiltered = [];
      this.generalInfoForm.patchValue({ tipoDeCorral: null });
      this.generalInfoForm.patchValue({ infoCliente: null });
    }
  }
  //Función que filtra la búsqueda por tipo de corral
  filterByCorralType() {
    let filteredResults: object[] = [];
    if (this.generalInfoForm.value['tipoDeCorral'] != null && this.generalInfoForm.value['region'] != null) {
      let type = this.generalInfoForm.value['tipoDeCorral'];
      this.directoryData.results.forEach((single: directoryDataType) => {
        let corralType = single.TIPO_DE_CORRAL.split(' ')[0];
        if (type == corralType) {
          filteredResults.push(single);
        }
      });
      this.directoryDataFiltered = filteredResults;
      console.log(filteredResults);
    }
    else {
      this.directoryDataFiltered = [];
      this.generalInfoForm.patchValue({ infoCliente: null });
    }
  }
  //Función para obtener los datos del cliente seleccionado
  getClientInfo() {
    var clientInfo = this.generalInfoForm.value['infoCliente'];
    if (clientInfo != null) {
      this.generalInfoForm.patchValue({
        PROPIETARIO: clientInfo['PROPIETARIO'],
        DIRECCION: clientInfo['DIRECCION'],
        MUNICIPIO: clientInfo['MUNICIPIO'],
        PSG: clientInfo['PSG'],
        LATITUD: clientInfo['LATITUD'],
        LONGITUD: clientInfo['LONGITUD'],
      });
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

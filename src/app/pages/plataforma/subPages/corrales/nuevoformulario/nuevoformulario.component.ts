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
  //Variables que son de prueba nomas
  prueba = {
    "seccion1":
    {
      "titulo": "PRIMERA SECCION - INSTALACIONES",
      "questionario": [
        {
          "pregunta": "1.- Un corral de Acopio de Consumo Nacional deberá consistir de todo el CACN, no están permitidas otras PSG o UPP dentro del mismo predio.",
          "respuestas": {
            "1": ["Opera con su PSG"],
            "0": ["Hay otra PSG en el CACN", "Hay una UPP en el CACN"]
          }
        },
        {
          "pregunta": "2.- El CACN está a autorizado por SAYG / DISI, que dictamina el cumplimiento de todos los requisitos mínimos acordados para tal figura.",
          "respuestas": {
            "1": ["Cuenta con autorización de DISI"],
            "0": ["No Cuenta con autorización de DISI", "Cuenta con autorización DISI, pero no la muestra"]
          }
        },
        {
          "pregunta": "3.- El Estado designa PERSONAL TECNICO para coordinar la vigilancia y supervisión de cada CACN entre el Gobierno Estatal y CEFPPSIN.",
          "respuestas": {
            "1": ["Asistió personal oficial SAyG y CEFPPSIN"],
            "0": ["No asistió personal oficial SAyG y CEFPPSIN"]
          }
        },
        {
          "pregunta": "4.- El Encargado del CACN es el responsable que el ingreso y egreso de ganado cumpla con todos los requisitos de trazabilidad.",
          "respuestas": {
            "1": ["El encargado garantiza el cumplimiento de los requisitos de trazabilidad"],
            "0": ["El encargado no garantiza el cumplimiento de los requisitos de trazabilidad"]
          }
        },
        {
          "pregunta": "5.- La Cerca perimetral deben ser adecuada para prevenir la entrada o salida de los animales de las instalaciones. Si existen propiedades adyacentes en donde haya ganado, deberá haber doble cerca para prevenir el contacto entre animales.",
          "respuestas": {
            "1": ["Cerca perimetral completa y en buen estado"],
            "0": ["No tiene cerca perimetral", "Cerca perimetral en mal estado al sur del CE", "Cerca perimetral en mal estado al norte del CE", "Cerca perimetral en mal estado al este del CE", "Cerca perimetral al oeste del CE", "Falta tramo de la cerca al sur del CE", "Falta tramo de cerca perimetral al norte del CE", "Falta tramo de cerca perimetral al este del CE", "Falta tramo de cerca perimetral al oeste del CE"]
          }
        },
        {
          "pregunta": "6.-Todos los CACN deberán mantener a los animales en confinamiento en condiciones secas (no se permite el pastoreo).",
          "respuestas": {
            "1": ["Ganado en confinamiento"],
            "0": ["Ganado en pastoreo"]
          }
        },
        {
          "pregunta": "7.- Las instalaciones y todo el equipo deben ser adecuadas para manejar a los animales de forma segura y efectiva como sea necesario.",
          "respuestas": {
            "1": ["Corrales, trampa, bascula, y shute adecuados y seguros"],
            "0": ["No cuenta con corrales, trampa, bascula, y shute adecuados y seguros"]
          }
        },
        {
          "pregunta": "8.- Los predios que rodean a los corrales deberán ser revisados para checar la presencia o ausencia de ganado. Los predios adyacentes que tengan ganado deberán probarse los animales anualmente.",
          "respuestas": {
            "1": ["No hay hatos adyacentes", "Hay un hato adyacente con prueba vigente de 1 año"],
            "0": ["Hay un hato adyacente sin dictámenes de prueba de TB y BR", "Hay un hato adyacente con dictámenes de prueba de TB y BR vencidos"]
          }
        },
        {
          "pregunta": "9.- Cuenta con infraestructura adecuada para monitorear la movilización de ganado en tiempo y forma (entradas y salidas de ganado en bitácoras físicas-electrónicas).",
          "respuestas": {
            "1": ["Bitácora física", "Bitácora electrónica"],
            "0": ["Bitácora electrónica", "La bitácora no está actualizada"]
          }
        },
        {
          "pregunta": "10.- El CACN permite la inspección de sus instalaciones y archivos documentales de ingreso y egreso de ganado cuando se les solicite, durante horarios de trabajo.",
          "respuestas": {
            "1": ["Permite la supervisión"],
            "0": ["No permite la supervisión"]
          }
        }
      ]
    },
    "seccion2":
    {
      "titulo": "SEGUNDA SECCION - ENTRADA DE GANADO AL CORRAL DE ENGORDA",
      "questionario": [
        {
          "pregunta": "1.- En un CACN solo se permite animales del Estado de Sinaloa.",
          "respuestas": {
            "1": ["El CACN solo aloja ganado del Sinaloa"],
            "0": ["El CACN solo aloja ganado del Sinaloa"]
          }
        },
        {
          "pregunta": "2.- Se documenta el ingreso y egreso del ganado a las instalaciones.  Los archivos de orígenes de todos los lotes de animales deberán ser estrictamente controlados. (BITACORA DE INGRESOS)",
          "respuestas": {
            "1": ["Bitácora física actualizada", "Bitácora electrónica actualizada"],
            "0": ["No tiene bitácora", "La bitácora no está actualizada"]
          }
        },
        {
          "pregunta": "3.- Todos los animales deberán portar desde origen arete de identificación oficial (SINIIGA) y marca CN. Cada arete y marca de fuego deberá ser verificada y registrar cada entrada al CACN.",
          "respuestas": {
            "1": ["Todo el ganado porta aretes SINIIGA y marca CN"],
            "0": ["Hay ganado sin ambos aretes SINIIGA", "Hay ganado sin arete SINIIGA tipo bandera", "Hay ganado sin arete SINIIGA tipo botón", "Una parte del ganado no porta la marca CN", "El total del ganado no porta la marca CN"]
          }
        },
        {
          "pregunta": "4.- Todos los vehículos que movilicen ganado al corral, deberán estar flejados y Guía de Transito REEMO.",
          "respuestas": {
            "1": ["El ganado cuenta con Guía REEMO y fleje"],
            "0": ["Moviliza ganado sin Guía REEMO", "No se anexó al expediente la Guía REEMO", "Moviliza ganado sin fleje", "No anexó al expediente el fleje"]
          }
        }
      ]
    },
    "seccion3":
    {
      "titulo": "TERCERA SECCION - SALIDA DEL GANADO DEL CORRAL DE ENGORDA",
      "questionario": [
        {
          "pregunta": "1.- Para ser considerado un CACN, todos los animales del corral deberán ir directamente a un CE o CEA   con vehículo flejado, Guía REEMO.",
          "respuestas": {
            "1": ["El CACN solo aloja ganado del Sinaloa"],
            "0": ["El CACN solo aloja ganado del Sinaloa"]
          }
        },
        {
          "pregunta": "2.- Todos los animales que salgan del CACN al RASTRO TIF deben llevar Guía de Transito REEMO, fleje y Certificado Zoosanitario, si se envían al RASTRO municipal deben llevar Guía de Transito REEMO y fleje.",
          "respuestas": {
            "1": ["El ganado  a rastro TIF cuenta con Guía REEMO, fleje y CZMN", "El ganado a rastro municipal cuenta con Guía REEMO y fleje"],
            "0": ["Moviliza ganado a rastro sin Guía REEMO", "No se anexó al expediente la Guía REEMO", "Moviliza ganado a rastro sin fleje", "Moviliza ganado a rastro TIF sin CZMN", "No se anexó al expediente el CZMN"]
          }
        },
        {
          "pregunta": "3.- Los animales que salen del CACN para sacrificio, CE O CEA deben estar identificados individualmente y registrar su número (SINIIGA) de identificación. (BITACORA DE EGRESOS)",
          "respuestas": {
            "1": ["El ganado enviado a rastro está identificado y registrado en bitácora"],
            "0": ["Envía ganado a rastro sin identificador SINIIGA", "No registra en bitácora el ganado enviado a rastro"]
          }
        }
      ]
    },
    "seccion4":
    {
      "titulo": "CUARTA SECCION - OTROS",
      "questionario": [
        {
          "pregunta": "1.- Cualquier animal que nazca en el CACN deberá ser documentado en bitácora correspondiente, marcado a fuego con CN, identificado con arete y permanecer ahí hasta su sacrificio o envió a un CEA.",
          "respuestas": {
            "1": ["No hay nacimientos", "Las crías están registradas y correlacionadas con la madre y tienen arete SINIIGA"],
            "0": ["No lleva bitácora de los nacimientos", "hay crías correlacionadas con las madre sin registrar", "Hay crías sin registrar, sin correlacionar con la madre", "Hay crías registradas y correlacionadas con la madre, que no tienen arete SINIIGA"]
          }
        },
        {
          "pregunta": "2.- Los CACN deberán mantener bitácora de todos los animales que mueran y de todos los animales que necesiten ser sacrificados humanitariamente.",
          "respuestas": {
            "1": ["El registro de los muertos en corral está actualizado"],
            "0": ["No lleva bitácora de muertos","La bitácora de muertos no está actualizada"]
          }
        },
        {
          "pregunta": "3.- La falta al cumplimiento de cualquiera de estos requerimientos está sujeta a una sanción o cancelación de la aprobación del CE.",
          "respuestas": {
            "1": ["El CACN acepta el compromiso de solventar las observaciones derivadas de la supervisión o recibir una sanción"]
          }
        }
      ]
    }
  }
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
  formularioCACN = this.fb.group({
    s1_p1_r:[],
    s1_p1_obs:[],
    s1_p1_obs_med:[],
    s1_p1_fecha_cumplimiento:[],
    s1_p2:[],
    s1_p2_obs:[],
    s1_p2_obs_med:[],
    s1_p2_fecha_cumplimiento:[],
    s1_p3:[],
    s1_p3_obs:[],
    s1_p3_obs_med:[],
    s1_p3_fecha_cumplimiento:[],
    s1_p4:[],
    s1_p4_obs:[],
    s1_p4_obs_med:[],
    s1_p4_fecha_cumplimiento:[],
    s1_p5:[],
    s1_p5_obs:[],
    s1_p5_obs_med:[],
    s1_p5_fecha_cumplimiento:[],
    s1_p6:[],
    s1_p6_obs:[],
    s1_p6_obs_med:[],
    s1_p6_fecha_cumplimiento:[],
    s1_p7:[],
    s1_p7_obs:[],
    s1_p7_obs_med:[],
    s1_p7_fecha_cumplimiento:[],
    s1_p8:[],
    s1_p8_obs:[],
    s1_p8_obs_med:[],
    s1_p8_fecha_cumplimiento:[],
    s1_p9:[],
    s1_p9_obs:[],
    s1_p9_obs_med:[],
    s1_p9_fecha_cumplimiento:[],
    s1_p10:[],
    s1_p10_obs:[],
    s1_p10_obs_med:[],
    s1_p10_fecha_cumplimiento:[],
    s2_p1:[],
    s2_p1_obs:[],
    s2_p1_obs_med:[],
    s2_p1_fecha_cumplimiento:[],
    s2_p2:[],
    s2_p2_obs:[],
    s2_p2_obs_med:[],
    s2_p2_fecha_cumplimiento:[],
    s2_p3:[],
    s2_p3_obs:[],
    s2_p3_obs_med:[],
    s2_p3_fecha_cumplimiento:[],
    s2_p4:[],
    s2_p4_obs:[],
    s2_p4_obs_med:[],
    s2_p4_fecha_cumplimiento:[],
    s3_p1:[],
    s3_p1_obs:[],
    s3_p1_obs_med:[],
    s3_p1_fecha_cumplimiento:[],
    s3_p2:[],
    s3_p2_obs:[],
    s3_p2_obs_med:[],
    s3_p2_fecha_cumplimiento:[],
    s3_p3:[],
    s3_p3_obs:[],
    s3_p3_obs_med:[],
    s3_p3_fecha_cumplimiento:[],
    s4_p1:[],
    s4_p1_obs:[],
    s4_p1_obs_med:[],
    s4_p1_fecha_cumplimiento:[],
    s4_p2:[],
    s4_p2_obs:[],
    s4_p2_obs_med:[],
    s4_p2_fecha_cumplimiento:[],
    s4_p3:[],
    s4_p3_obs:[],
    s4_p3_obs_med:[],
    s4_p3_fecha_cumplimiento:[],
  });
  formularioCE = this.fb.group({

  });
  formularioCEA = this.fb.group({

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
  

  constructor(private fb: FormBuilder, private _mongodb: MongodbService) {

  }

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

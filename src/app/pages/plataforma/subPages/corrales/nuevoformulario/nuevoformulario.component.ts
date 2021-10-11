import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-nuevoformulario',
  templateUrl: './nuevoformulario.component.html',
  styleUrls: ['./nuevoformulario.component.css']
})
export class NuevoformularioComponent implements OnInit {
  //Variables con los templates de los formularios
  formularioCACN:any;
  formularioCE:any;
  formularioCEA:any;
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
  //Variables booleanas que indicas el tipo de formulario
  isCACNform = false;
  isCEform = false;
  isCEAform = false;
  isNothing = true;

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
  answersFormCACN = this.fb.group({
    inventario_de_ganado: [],
    CACN: [],
    MVZ_CACN: [],
    MVZ_RA_SUPERVISOR: [],
    CACN_answersSection1: this.fb.array([]),
    CACN_answersSection2: this.fb.array([]),
    CACN_answersSection3: this.fb.array([]),
    CACN_answersSection4: this.fb.array([])
  });
  get CACN_answersSection1() {
    return this.answersFormCACN.controls["CACN_answersSection1"] as FormArray;
  }
  get CACN_answersSection2() {
    return this.answersFormCACN.controls["CACN_answersSection2"] as FormArray;
  }
  get CACN_answersSection3() {
    return this.answersFormCACN.controls["CACN_answersSection3"] as FormArray;
  }
  get CACN_answersSection4() {
    return this.answersFormCACN.controls["CACN_answersSection4"] as FormArray;
  }
  addCACN_AnswersSection1Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CACN_answersSection1.push(answerData);
    }
  }
  addCACN_AnswersSection2Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CACN_answersSection2.push(answerData);
    }
  }
  addCACN_AnswersSection3Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CACN_answersSection3.push(answerData);
    }
  }
  addCACN_AnswersSection4Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CACN_answersSection4.push(answerData);
    }
  }

  answersFormCE = this.fb.group({
    capacidad_instalada: [],
    capacidad_utilizada: [],
    numero_corrales_internos: [],
    existencia_corrales_alternos_o_cuarentena: [],
    numero_de_autorizacion: [],
    vigencia_de_autorizacion: [],
    medico_veterinario_responsable_de_supervision: [],
    periodo_de_supervision: [],
    CE_answersSection1: this.fb.array([]),
    CE_answersSection2: this.fb.array([]),
    CE_answersSection3: this.fb.array([]),
    CE_answersSection4: this.fb.array([]),
    observaciones_y_acuerdos: [],
  });
  get CE_answersSection1() {
    return this.answersFormCE.controls["CE_answersSection1"] as FormArray;
  }
  get CE_answersSection2() {
    return this.answersFormCE.controls["CE_answersSection2"] as FormArray;
  }
  get CE_answersSection3() {
    return this.answersFormCE.controls["CE_answersSection3"] as FormArray;
  }
  get CE_answersSection4() {
    return this.answersFormCE.controls["CE_answersSection4"] as FormArray;
  }
  addCE_AnswersSection1Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CE_answersSection1.push(answerData);
    }
  }
  addCE_AnswersSection2Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CE_answersSection2.push(answerData);
    }
  }
  addCE_AnswersSection3Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CE_answersSection3.push(answerData);
    }
  }
  addCE_AnswersSection4Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CE_answersSection4.push(answerData);
    }
  }

  answersFormCEA = this.fb.group({
    preguntas_iniciales1: this.fb.array([]),
    preguntas_iniciales2: this.fb.array([]),
    capacidad_instalada: [],
    capacidad_utilizada: [],
    numero_corrales_internos: [],
    existencia_corrales_alternos_o_cuarentena: [],
    numero_de_autorizacion: [],
    vigencia_de_autorizacion: [],
    medico_veterinario_responsable_del_CEA: [],
    medico_veterinario_responsable_de_supervision: [],
    periodo_de_supervision: [],
    numero_de_cabezas_en_el_CEA: [],
    numero_de_cabezas_ingresadas_al_CEA: [],
    cabezas_engordadas: [],
    cabezas_egresadas_del_CEA_para_sacrificio_en_rastros: [],
    numero_cabezas_muertas_en_el_CEA: [],
    numero_cabezas_en_el_CEA_ultimo_dia_mes_evaluacion: [],
    CEA_answersSection1: this.fb.array([]),
    CEA_answersSection2: this.fb.array([]),
    CEA_answersSection3: this.fb.array([]),
    CEA_answersSection4: this.fb.array([]),
    observaciones_y_acuerdos: [],
  });
  get preguntas_iniciales1() {
    return this.answersFormCEA.controls["preguntas_iniciales1"] as FormArray;
  }
  get preguntas_iniciales2() {
    return this.answersFormCEA.controls["preguntas_iniciales2"] as FormArray;
  }
  get CEA_answersSection1() {
    return this.answersFormCEA.controls["CEA_answersSection1"] as FormArray;
  }
  get CEA_answersSection2() {
    return this.answersFormCEA.controls["CEA_answersSection2"] as FormArray;
  }
  get CEA_answersSection3() {
    return this.answersFormCEA.controls["CEA_answersSection3"] as FormArray;
  }
  get CEA_answersSection4() {
    return this.answersFormCEA.controls["CEA_answersSection4"] as FormArray;
  }
  addPreguntasIniciales1Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: []
      });
      this.preguntas_iniciales1.push(answerData);
    }
  }
  addPreguntasIniciales2Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: []
      });
      this.preguntas_iniciales2.push(answerData);
    }
  }
  addCEA_AnswersSection1Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CEA_answersSection1.push(answerData);
    }
  }
  addCEA_AnswersSection2Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CEA_answersSection2.push(answerData);
    }
  }
  addCEA_AnswersSection3Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CEA_answersSection3.push(answerData);
    }
  }
  addCEA_AnswersSection4Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CEA_answersSection4.push(answerData);
    }
  }

   constructor(private fb: FormBuilder, private _mongodb: MongodbService) {
     this.queryMongodbTemplateForms();
    
  }

   ngOnInit(): void {

  }
  // Función que consulta a Mongodb sobre los templates y crea los dynamic forms
  async queryMongodbTemplateForms(){
    let formularios:any = await this._mongodb.queryForms();
    console.log(formularios['CACN_form']);
    this.formularioCACN = formularios['CACN_form'];
    this.formularioCE = formularios['CE_form'];
    this.formularioCEA = formularios['CEA_form'];
    console.log(formularios['CEA_form']);

    this.addCACN_AnswersSection1Data(formularios['CACN_form']['seccion1']['questionario'].length);
    this.addCACN_AnswersSection2Data(formularios['CACN_form']['seccion2']['questionario'].length);
    this.addCACN_AnswersSection3Data(formularios['CACN_form']['seccion3']['questionario'].length);
    this.addCACN_AnswersSection4Data(formularios['CACN_form']['seccion4']['questionario'].length);

    this.addCE_AnswersSection1Data(formularios['CE_form']['seccion1']['questionario'].length);
    this.addCE_AnswersSection2Data(formularios['CE_form']['seccion2']['questionario'].length);
    this.addCE_AnswersSection3Data(formularios['CE_form']['seccion3']['questionario'].length);
    this.addCE_AnswersSection4Data(formularios['CE_form']['seccion4']['questionario'].length);

    this.addCEA_AnswersSection1Data(formularios['CEA_form']['seccion1']['questionario'].length);
    this.addCEA_AnswersSection2Data(formularios['CEA_form']['seccion2']['questionario'].length);
    this.addCEA_AnswersSection3Data(formularios['CEA_form']['seccion3']['questionario'].length);
    this.addCEA_AnswersSection4Data(formularios['CEA_form']['seccion4']['questionario'].length);
    this.addPreguntasIniciales1Data(formularios['CEA_form']['preguntasIniciales1']['questionario'].length);
    this.addPreguntasIniciales2Data(formularios['CEA_form']['preguntasIniciales2']['questionario'].length);
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
      this.isCACNform = false;
      this.isCEform = false;
      this.isCEAform = false;
      this.isNothing = true;
      this.directoryDataFiltered = [];
      this.generalInfoForm.patchValue({ tipoDeCorral: null });
      this.generalInfoForm.patchValue({ infoCliente: null });
    }
  }
  //Función que filtra la búsqueda por tipo de corral y muestra el formulario correspondiente
  filterByCorralType() {
    let filteredResults: object[] = [];
    if (this.generalInfoForm.value['tipoDeCorral'] != null && this.generalInfoForm.value['region'] != null) {
      this.generalInfoForm.patchValue({ infoCliente: null });
      let type = this.generalInfoForm.value['tipoDeCorral'];
      this.directoryData.results.forEach((single: directoryDataType) => {
        let corralType = single.TIPO_DE_CORRAL.split(' ')[0];
        if (type == corralType) {
          filteredResults.push(single);
        }
      });
      this.directoryDataFiltered = filteredResults;
      console.log(filteredResults);
      //Mostramos formulario
      switch (type) {
        case 'CACN':
          this.isCACNform = true;
          this.isCEform = false;
          this.isCEAform = false;
          this.isNothing = false;

          break;
        case 'CE':
          this.isCACNform = false;
          this.isCEform = true;
          this.isCEAform = false;
          this.isNothing = false;

          break;
        case 'CEA':
          this.isCACNform = false;
          this.isCEform = false;
          this.isCEAform = true;
          this.isNothing = false;
          break;

        default:
          this.isCACNform = false;
          this.isCEform = false;
          this.isCEAform = false;
          this.isNothing = true;
          break;
      }
    }
    else {
      this.isCACNform = false;
      this.isCEform = false;
      this.isCEAform = false;
      this.isNothing = true;
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
  //Función que envía las respuestas del formulario de CACN
  sendCACN() {
    console.log(this.answersFormCACN.value);

  }
  sendCE() {
    console.log(this.answersFormCE.value);
  }
  sendCEA() {
    console.log(this.answersFormCEA.value);
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

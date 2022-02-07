import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {
  
  search_value_norte = '';
  search_value_centro = '';
  search_value_sur = '';
  visible_table_norte = false;
  visible_table_centro = false;
  visible_table_sur = false;
  list_norte = [
    {
			"_id": "-",
			"TIPO_DE_CORRAL": "-",
			"PSG": "-",
			"PROPIETARIO": "-",
			"ACTIVIDAD": "-",
			"NOMBRE": "-",
			"DIRECCION": "-",
			"FRECUENCIA DE VISITA": "-",
			"COLONIA": "-",
			"MUNICIPIO": "-",
			"ESTADO": "-",
			"LATITUD": "-",
			"LONGITUD": "-"
		}
  ];
  listOfDisplayNorte = [...this.list_norte];
  list_centro = [
    {
			"_id": "-",
			"TIPO_DE_CORRAL": "-",
			"PSG": "-",
			"PROPIETARIO": "-",
			"ACTIVIDAD": "-",
			"NOMBRE": "-",
			"DIRECCION": "-",
			"FRECUENCIA DE VISITA": "-",
			"COLONIA": "-",
			"MUNICIPIO": "-",
			"ESTADO": "-",
			"LATITUD": "-",
			"LONGITUD": "-"
		}
  ];
  listOfDisplayCentro = [...this.list_centro];
  list_sur = [
    {
			"_id": "-",
			"TIPO_DE_CORRAL": "-",
			"PSG": "-",
			"PROPIETARIO": "-",
			"ACTIVIDAD": "-",
			"NOMBRE": "-",
			"DIRECCION": "-",
			"FRECUENCIA DE VISITA": "-",
			"COLONIA": "-",
			"MUNICIPIO": "-",
			"ESTADO": "-",
			"LATITUD": "-",
			"LONGITUD": "-"
		}
  ];
  listOfDisplaySur = [...this.list_sur];

  //Formulario del nuevo coral
  new_corral = this.fb.group({
    "TIPO_DE_CORRAL": [null,Validators.required],
    "PSG": [null,Validators.required],
    "PROPIETARIO": [null,Validators.required],
    "ACTIVIDAD": [null,Validators.required],
    "NOMBRE": [null,Validators.required],
    "DIRECCION": [null,Validators.required],
    "FRECUENCIA DE VISITA": [null,Validators.required],
    "COLONIA": [null,Validators.required],
    "MUNICIPIO": [null,Validators.required],
    "ESTADO": [null,Validators.required],
    "LATITUD": [null,Validators.required],
    "LONGITUD": [null,Validators.required]
  });

  update_corral = this.fb.group({
    "_id": [null,Validators.required],
    "TIPO_DE_CORRAL": [null,Validators.required],
    "PSG": [null,Validators.required],
    "PROPIETARIO": [null,Validators.required],
    "ACTIVIDAD": [null,Validators.required],
    "NOMBRE": [null,Validators.required],
    "DIRECCION": [null,Validators.required],
    "FRECUENCIA DE VISITA": [null,Validators.required],
    "COLONIA": [null,Validators.required],
    "MUNICIPIO": [null,Validators.required],
    "ESTADO": [null,Validators.required],
    "LATITUD": [null,Validators.required],
    "LONGITUD": [null,Validators.required]
  });

  constructor(private _mongodb:MongodbService, private fb:FormBuilder) {
    this.obtenerListaDeCorralesPorZona();
  }

  ngOnInit(): void {
    
  }

  async obtenerListaDeCorralesPorZona(){
    let result = await this._mongodb.obtenerListaDeCorralesPorZona();
    this.list_norte = result.corrales_norte;
    this.listOfDisplayNorte = [...this.list_norte];
    this.list_centro = result.corrales_centro;
    this.listOfDisplayCentro = [...this.list_centro];
    this.list_sur = result.corrales_sur;
    this.listOfDisplaySur = [...this.list_sur];
  }

  listOfData = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  //Funciones de búsqueda y reseteo para cada una de las tablas
  reset_norte(): void {
    this.search_value_norte = '';
    this.search_norte();
  }

  search_norte(): void {
    this.visible_table_norte = false;
    this.listOfDisplayNorte = this.list_norte.filter((item) => item.NOMBRE.indexOf(this.search_value_norte.toUpperCase()) !== -1);
  }

  reset_centro(): void {
    this.search_value_centro = '';
    this.search_centro();
  }

  search_centro(): void {
    this.visible_table_centro = false;
    this.listOfDisplayCentro = this.list_centro.filter((item) => item.NOMBRE.indexOf(this.search_value_centro.toUpperCase()) !== -1);
  }

  reset_sur(): void {
    this.search_value_sur = '';
    this.search_sur();
  }

  search_sur(): void {
    this.visible_table_sur = false;
    this.listOfDisplaySur = this.list_sur.filter((item) => item.NOMBRE.indexOf(this.search_value_sur.toUpperCase()) !== -1);
  }

  //Funciones para el Modal
  create_isVisible:any = false;
  update_isVisible:any = false;

  showModal_create(): void {
    this.create_isVisible = true;
  }

  showModal_update(): void {
    this.update_isVisible = true;
  }

  handleOk(): void {
    
    this.new_corral.status === 'VALID' ? this.guardarCorral() : this.new_corral.markAllAsTouched();
  }

  async handleUpdate() {
    let corral_update = {
      "_id": this.update_corral.value._id,
      "TIPO_DE_CORRAL": this.update_corral.value.TIPO_DE_CORRAL.toUpperCase(),
      "PSG": this.update_corral.value.PSG.toUpperCase(),
      "PROPIETARIO": this.update_corral.value.PROPIETARIO.toUpperCase(),
      "ACTIVIDAD": this.update_corral.value.ACTIVIDAD.toUpperCase(),
      "NOMBRE": this.update_corral.value.NOMBRE.toUpperCase(),
      "DIRECCION": this.update_corral.value.DIRECCION.toUpperCase(),
      "FRECUENCIA DE VISITA": this.update_corral.value['FRECUENCIA DE VISITA'].toUpperCase(),
      "COLONIA": this.update_corral.value.COLONIA.toUpperCase(),
      "MUNICIPIO": this.update_corral.value.MUNICIPIO.toUpperCase(),
      "ESTADO": this.update_corral.value.ESTADO.toUpperCase(),
      "LATITUD": this.update_corral.value.LATITUD,
      "LONGITUD": this.update_corral.value.LONGITUD
    }
    let result:any = await this._mongodb.updateCorral(corral_update);
    if (result.done == true) {
      this.update_isVisible = false;
      window.location.reload();
    }
  }

  async guardarCorral() {
    console.log(this.new_corral.value);
    let corral = {
			"TIPO_DE_CORRAL": this.new_corral.value.TIPO_DE_CORRAL.toUpperCase(),
			"PSG": this.new_corral.value.PSG.toUpperCase(),
			"PROPIETARIO": this.new_corral.value.PROPIETARIO.toUpperCase(),
			"ACTIVIDAD": this.new_corral.value.ACTIVIDAD.toUpperCase(),
			"NOMBRE": this.new_corral.value.NOMBRE.toUpperCase(),
			"DIRECCION": this.new_corral.value.DIRECCION.toUpperCase(),
			"FRECUENCIA DE VISITA": this.new_corral.value['FRECUENCIA DE VISITA'].toUpperCase(),
			"COLONIA": this.new_corral.value.COLONIA.toUpperCase(),
			"MUNICIPIO": this.new_corral.value.MUNICIPIO.toUpperCase(),
			"ESTADO": this.new_corral.value.ESTADO.toUpperCase(),
			"LATITUD": this.new_corral.value.LATITUD,
			"LONGITUD": this.new_corral.value.LONGITUD
		}
    try {
      let result = await this._mongodb.createNewCorral(corral);
      this.create_isVisible = false;
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  handleCancel(): void {
    this.new_corral.reset();
    this.update_corral.reset();
    console.log('Button cancel clicked!');
    this.create_isVisible = false;
    this.update_isVisible = false;
  }

  //Funciones de acciones de la tabla
  async deleteCorral(id:string, corral_type:string){
    console.log(id);
    console.log(corral_type);
    let query = {
      "_id": id,
      "TIPO_DE_CORRAL": corral_type
    }
    let result:any = await this._mongodb.deleteCorral(query);
    if (result.done == true){
      window.location.reload();
    }
  }

  async updateCorral(corral_info:object){
    this.showModal_update();
    this.update_corral.patchValue(corral_info);
    console.log(this.update_corral.value);
  }


}

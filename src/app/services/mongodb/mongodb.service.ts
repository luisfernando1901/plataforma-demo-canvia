import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor(private http:HttpClient) { }

  async queryRegion(region:string){
    let queryRegion = {
      region: region
    };
    let results
    try {
      results = await this.http.post('http://localhost:3000/directorioPorRegion',queryRegion).toPromise();
    } catch (error) {
      results = {results: []};
    }
    return results
  }

  async queryForms(){
    let results = await this.http.get('http://localhost:3000/templateFormularios').toPromise();
    return results
  }

  async uploadForm(data:object){
    let result = await this.http.post('http://localhost:3000/guardarFormulario',data).toPromise();
    return result
  }

  async getForms(){
    let result = await this.http.get('http://localhost:3000/historicoDeFormularios').toPromise();
    return result
  }

  async getColaboratorsList(){
    let result = await this.http.get('http://localhost:3000/listaDeColaboradores').toPromise();
    return result
  }

  async getFolioName(corralType:string){
    let queryCorralType = { corralType: corralType};
    let result:any = await this.http.post('http://localhost:3000/folioPorTipoDeCorral',queryCorralType).toPromise();
    return result.folioName
  }
}
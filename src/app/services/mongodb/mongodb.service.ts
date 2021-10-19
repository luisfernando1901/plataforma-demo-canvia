import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from'../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  token = '';

  constructor(private http:HttpClient) { }

  async queryRegion(region:string){
    this.getSessionToken();
    let queryRegion = {
      region: region
    };
    let results
    try {
      results = await this.http.post(`${environment.base_dev_url}/directorioPorRegion`,queryRegion,{headers:{'authorization': this.token}}).toPromise();
    } catch (error) {
      results = {results: []};
    }
    return results
  }

  async queryForms(){
    this.getSessionToken();
    let results = await this.http.get(`${environment.base_dev_url}/templateFormularios`,{headers:{'authorization': this.token}}).toPromise();
    return results
  }

  async uploadForm(data:object){
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_dev_url}/guardarFormulario`,data,{headers:{'authorization': this.token}}).toPromise();
    return result
  }

  async getForms(){
    this.getSessionToken();
    let result = await this.http.get(`${environment.base_dev_url}/historicoDeFormularios`,{headers:{'authorization': this.token}}).toPromise();
    return result
  }

  async getColaboratorsList(){
    this.getSessionToken();
    let result = await this.http.get(`${environment.base_dev_url}/listaDeColaboradores`,{headers:{'authorization': this.token}}).toPromise();
    return result
  }

  async getFolioName(corralType:string){
    this.getSessionToken();
    let queryCorralType = { corralType: corralType};
    let result:any = await this.http.post(`${environment.base_dev_url}/folioPorTipoDeCorral`,queryCorralType,{headers:{'authorization': this.token}}).toPromise();
    return result.folioName
  }

  async authenticateUser(userCredentials:object){
    let result = await this.http.post(`${environment.base_dev_url}/authenticate`,userCredentials).toPromise();
    return result
  }

  async verifyAndReniewToken(){
    this.getSessionToken();
    let result = await this.http.get(`${environment.base_dev_url}/verifyToken`,{headers:{'authorization': this.token}}).toPromise();
    return result
  }

  getSessionToken() {
    let token = sessionStorage.getItem('comiteToken');
    if (token != null) {
      this.token = token;
    }
    else this.token = '';
  }
}
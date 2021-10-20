import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  token = '';

  constructor(private http: HttpClient) { }
  
  // Función para obetener el directorio dependiendo de la región consultada
  async queryRegion(region: string) {
    this.getSessionToken();
    let queryRegion = {
      region: region
    };
    let results
    try {
      results = await this.http.post(`${environment.base_url}/directorioPorRegion`, queryRegion, { headers: { 'authorization': this.token } }).toPromise();
    } catch (error) {
      results = { results: [] };
    }
    return results
  }
  // Función para obetener los formularios de CACN, CE Y CEA
  async queryForms() {
    this.getSessionToken();
    let results = await this.http.get(`${environment.base_url}/templateFormularios`, { headers: { 'authorization': this.token } }).toPromise();
    return results
  }
  //Función para almacenar el formulario en la colección de CACN/CE/CEA
  async uploadForm(data: object) {
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_url}/guardarFormulario`, data, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }
  //Función para obtener los formularios almacenados
  async getForms() {
    this.getSessionToken();
    let result = await this.http.get(`${environment.base_url}/historicoDeFormularios`, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }
  // Función para obtener la lista de colaboradores
  async getColaboratorsList() {
    this.getSessionToken();
    let result = await this.http.get(`${environment.base_url}/listaDeColaboradores`, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }
  //Función para obtener el número de folio por tipo corral
  async getFolioName(corralType: string) {
    this.getSessionToken();
    let queryCorralType = { corralType: corralType };
    let result: any = await this.http.post(`${environment.base_url}/folioPorTipoDeCorral`, queryCorralType, { headers: { 'authorization': this.token } }).toPromise();
    return result.folioName
  }
  // Función para autenticar usuario
  async authenticateUser(userCredentials: object) {
    let result = await this.http.post(`${environment.base_url}/authenticate`, userCredentials).toPromise();
    return result
  }
  // Función para verificar validez del token
  async verifyAndReniewToken() {
    this.getSessionToken();
    let result = await this.http.get(`${environment.base_url}/verifyToken`, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }
  // Función para ser llamada en todas las funciones previas que necesiten obtener el token de sesión
  getSessionToken() {
    let token = sessionStorage.getItem('comiteToken');
    if (token != null) {
      this.token = token;
    }
    else this.token = '';
  }
}
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
  //Función para obtener los formularios de CACN, CE y CEA en el año actual
  async getFormsByYear(year:string){
    this.getSessionToken();
    let result:any = await this.http.get(`${environment.base_url}/numeroDeVisitasPorCorral/${year}`, { headers: { 'authorization': this.token } }).toPromise();
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
  // Función para obtener la información de tendencias
  async getInfoExcelTendencias(year:string) {
    this.getSessionToken();
    let result: any = await this.http.post(`${environment.base_url}/obtenerInfoExcelTendencias`, {year:year}, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }
  //Función para obtener los nombres de corrales por tipo de corral
  async getCorralNamesByCorralType(corralType: string) {
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_url}/getCorralsNamesByCorralType`,{corralType:corralType} ,{ headers: { 'authorization': this.token } }).toPromise();
    return result
  }
  // Función para obtener la información de la gráfica de tendencias
  async getInfoGraphTendencias(corralType:string, corralName:string) {
    this.getSessionToken();
    let result: any = await this.http.post(`${environment.base_url}/obtenerInfoGraphTendencias`,{corralType:corralType, corralName:corralName} ,{ headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para obtener la información de la gráfica de Calificaciones General
  async getInfoGraphCalificacionesGeneral(corral_type:string, year:string){
    this.getSessionToken();
    let result:any = await this.http.post(`${environment.base_url}/obtenerInfoGraphCalificacionGeneral`, {corral_type:corral_type, year:year},{ headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  //Función para obtener la información de la gráfica de Incumplimientos General (ESTA FALTA IMPLEMENTAR)
  async getInfoGraphIncumplimientosGeneral(corral_type:string, year:string){
    this.getSessionToken();
    let result:any = await this.http.post(`${environment.base_url}/obtenerInfoGraphPorcentajeIncumplimientoGeneral`, {corral_type:corral_type, year:year},{ headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  // Función para obtener la información de la gráfica de porcentaje de incumplimiento por tipo de corral
  async getInfoGraphPorcentajeIncumplimiento() {
  this.getSessionToken();
  let result: any = await this.http.get(`${environment.base_url}/obtenerInfoGraphPorcentajeIncumplimiento`, { headers: { 'authorization': this.token } }).toPromise();
  return result
  }

  //Función para consultar los incumplimientos de CACN
  async getIncumplimientosCACN() {
    this.getSessionToken();
    let result:any = await this.http.get(`${environment.base_url}/obtenerErroresFormulariosCACN`, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  //Función para consultar los incumplimientos de CE
  async getIncumplimientosCE() {
    this.getSessionToken();
    let result:any = await this.http.get(`${environment.base_url}/obtenerErroresFormulariosCE`, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  //Función para consultar los incumplimientos de CEA
  async getIncumplimientosCEA() {
    this.getSessionToken();
    let result:any = await this.http.get(`${environment.base_url}/obtenerErroresFormulariosCEA`, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  //Función para consultar los incumplimientos de CACN
  async getIncumplimientosDetailedCACN(corral_name:string, year_month:string) {
    this.getSessionToken();
    let result:any = await this.http.post(`${environment.base_url}/obtenerErroresDetalladosFormulariosCACN`,{corral_name:corral_name, year_month:year_month}, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  //Función para consultar los incumplimientos de CE
  async getIncumplimientosDetailedCE(corral_name:string, year_month:string) {
    this.getSessionToken();
    let result:any = await this.http.post(`${environment.base_url}/obtenerErroresDetalladosFormulariosCE`,{corral_name:corral_name, year_month:year_month}, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  //Función para consultar los incumplimientos de CEA
  async getIncumplimientosDetailedCEA(corral_name:string, year_month:string) {
    this.getSessionToken();
    let result:any = await this.http.post(`${environment.base_url}/obtenerErroresDetalladosFormulariosCEA`,{corral_name:corral_name, year_month:year_month}, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  //Función para consultar los datos de la gráfica de calificación detallado
  async getInfoGraphCalificacionDetallado(corral_type:string,corral_name:string, year_month:string) {
    this.getSessionToken();
    let result:any = await this.http.post(`${environment.base_url}/obtenerInfoGraphCalificacionDetallado`,{corral_type:corral_type, corral_name:corral_name, year_month:year_month}, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  //Función para consultar los datos de la gráfica de incumplimientos detallado
  async getInfoGraphIncumplimientosDetallado(corral_type:string,corral_name:string, year_month:string) {
    this.getSessionToken();
    let result:any = await this.http.post(`${environment.base_url}/obtenerInfoGraphPorcentajeIncumplimientoDetallado`,{corral_type:corral_type, corral_name:corral_name, year_month:year_month}, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }

  // Función para verificar validez del token
  async verifyAndReniewToken() {
    this.getSessionToken();
    let result = await this.http.get(`${environment.base_url}/verifyToken`, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para obtener el total de corrales por tipo
  async getTotalCorralesPorTipo() {
    this.getSessionToken();
    let result:any = await this.http.get(`${environment.base_url}/obtenerTotalCorralesPorTipo`, { headers: { 'authorization': this.token } }).toPromise();
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

  //Función para crear un nuevo usuario
  async createUser(userData: object) {
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_url}/createNewUser`, userData, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para crear un nuevo usuario
  async deleteUser(userData: object) {
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_url}/createNewUser`, userData, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para eliminar un colaborador
  async deleteColaborator(userData: string) {
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_url}/deleteColaborator`, userData, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para obtener el directorio de corrales
  async obtenerListaDeCorralesPorZona() {
    this.getSessionToken();
    let result:any = await this.http.get(`${environment.base_url}/obtenerListaDeCorralesPorZona`, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para crear un nuevo corral en el directorio
  async createNewCorral(corralData: object) {
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_url}/agregarCorral`, corralData, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para editar un corral en el directorio
  async updateCorral(corralData: object) {
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_url}/editarCorral`, corralData, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para eliminar un corral del directorio
  async deleteCorral(corralData: object) {
    this.getSessionToken();
    let result = await this.http.post(`${environment.base_url}/eliminarCorral`, corralData, { headers: { 'authorization': this.token } }).toPromise();
    return result
  }

  //Función para obtener el numero de cabezas por tipo de corral
  async getNumCabezasPorTipoCorral(corral_type: string, corral_name:string, year:number) {
    this.getSessionToken();
    let query = {
      corral_type: corral_type,
      corral_name: corral_name,
      year: year
    };
    let result:any = await this.http.post(`${environment.base_url}/obtenerCabezasPorTipoDeFormulario`,query, { headers: { 'authorization': this.token } }).toPromise();
    return result.data
  }
}
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
    return results;
  }
}
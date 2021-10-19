import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MongodbService } from '../mongodb/mongodb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _mongodb:MongodbService, private router:Router){

  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    //Verificamos si existe un token
    let token = sessionStorage.getItem('comiteToken');
    if (token != null) {
      //Verificamos validez del token
      let result:any = await this._mongodb.verifyAndReniewToken();
      if(result.tokenStillAlive) {
        sessionStorage.setItem('comiteToken',result.reniewedToken);
        return true;
      }
      else {
        sessionStorage.removeItem('comiteToken');
        this.router.navigate(['/login']);
      }
    }
      this.router.navigate(['/login']);
    return false
  }
  
}

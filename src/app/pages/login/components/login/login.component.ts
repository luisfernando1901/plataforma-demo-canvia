import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCredentialsForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private fb:FormBuilder, private _mongodb:MongodbService, private router:Router) { }

  ngOnInit(): void {
  }

  async login(){
    let userCredentials = this.userCredentialsForm.value;
    let result:any = await this._mongodb.authenticateUser(userCredentials);
    if ( result.authenticated == true) {
      sessionStorage.setItem('comiteToken',result.token);
      this.router.navigate(['/plataforma']);
    }
    else sessionStorage.removeItem('comiteToken');
  }

}

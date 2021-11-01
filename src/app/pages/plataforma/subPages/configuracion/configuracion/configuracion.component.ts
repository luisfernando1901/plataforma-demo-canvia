import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  newUser = this.fb.group({
    nombre: [''],
    email: [''],
    password: [''],
    rol: [''],
  });

  buttonDisabled = false;

  constructor(private fb:FormBuilder, private _mongodb:MongodbService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  //Función para crear nuevo usuario
  async createNewUser(){
    this.buttonDisabled = true;
    console.log(this.newUser.value);
    try {
      let result:any = await this._mongodb.createUser(this.newUser.value);
      if (result.userCreated == true){
        this.messageService.add({severity:'success', summary:'Usuario creado', detail:'El usuario ha sido creado correctamente'});
        this.buttonDisabled = false;
        this.newUser.reset();
      }
    } catch (error) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Ha ocurrido un error al crear el usuario'});
    }
  }

}

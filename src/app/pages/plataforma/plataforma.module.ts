import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformaRoutingModule } from './plataforma-routing.module';
import { SidebarMenuComponent } from './subPages/sidebar-menu/sidebar-menu.component';
import { InicioComponent } from './subPages/inicio/inicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//NG-ZORRO modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
//PRIMENG modules
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PasswordModule} from 'primeng/password';

//Components
import { IconsProviderModule } from '../..//icons-provider.module';
import { NuevoformularioComponent } from './subPages/corrales/nuevoformulario/nuevoformulario.component';
import { HistorialdereportesComponent } from './subPages/corrales/historialdereportes/historialdereportes.component';
//services
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import { PdfgeneratorService } from 'src/app/services/pdfgenerator/pdfgenerator.service';
import { ListaDeColaboradoresComponent } from './subPages/colaboradores/lista-de-colaboradores/lista-de-colaboradores.component';
import { ConfiguracionComponent } from './subPages/configuracion/configuracion/configuracion.component';

@NgModule({
  declarations: [
    SidebarMenuComponent,
    InicioComponent,
    NuevoformularioComponent,
    HistorialdereportesComponent,
    ListaDeColaboradoresComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    PlataformaRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    TabViewModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    NzTableModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    PasswordModule,
    NzSelectModule
  ],
  providers:[
    MongodbService,
    MessageService,
    PdfgeneratorService
  ]
})
export class PlataformaModule { }

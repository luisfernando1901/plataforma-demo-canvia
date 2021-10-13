import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformaRoutingModule } from './plataforma-routing.module';
import { SidebarMenuComponent } from './subPages/sidebar-menu/sidebar-menu.component';
import { InicioComponent } from './subPages/inicio/inicio.component';
import { ReactiveFormsModule } from '@angular/forms';
//NG-ZORRO modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
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
//Components
import { IconsProviderModule } from '../..//icons-provider.module';
import { NuevoformularioComponent } from './subPages/corrales/nuevoformulario/nuevoformulario.component';
import { HistorialdereportesComponent } from './subPages/corrales/historialdereportes/historialdereportes.component';
//services
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import { PdfgeneratorService } from 'src/app/services/pdfgenerator/pdfgenerator.service';

@NgModule({
  declarations: [
    SidebarMenuComponent,
    InicioComponent,
    NuevoformularioComponent,
    HistorialdereportesComponent
  ],
  imports: [
    CommonModule,
    PlataformaRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    DropdownModule,
    InputTextModule,
    TabViewModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    MessageModule
  ],
  providers:[
    MongodbService,
    MessageService,
    PdfgeneratorService
  ]
})
export class PlataformaModule { }

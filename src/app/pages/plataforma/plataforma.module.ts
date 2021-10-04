import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformaRoutingModule } from './plataforma-routing.module';
import { SidebarMenuComponent } from './subPages/sidebar-menu/sidebar-menu.component';
import { InicioComponent } from './subPages/inicio/inicio.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../..//icons-provider.module';

@NgModule({
  declarations: [
    SidebarMenuComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    PlataformaRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule
  ]
})
export class PlataformaModule { }

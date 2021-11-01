import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeColaboradoresComponent } from './subPages/colaboradores/lista-de-colaboradores/lista-de-colaboradores.component';
import { HistorialdereportesComponent } from './subPages/corrales/historialdereportes/historialdereportes.component';
import { NuevoformularioComponent } from './subPages/corrales/nuevoformulario/nuevoformulario.component';
import { InicioComponent } from './subPages/inicio/inicio.component';
import { SidebarMenuComponent } from './subPages/sidebar-menu/sidebar-menu.component';
//Guards
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { ConfiguracionComponent } from './subPages/configuracion/configuracion/configuracion.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: '', 
    component: SidebarMenuComponent,
    children: [
      { path: 'inicio', component: InicioComponent, canActivate:[AuthGuard] },
      { path: 'corrales/nuevoformulario', component: NuevoformularioComponent,canActivate:[AuthGuard] },
      { path: 'corrales/historialdereportes', component: HistorialdereportesComponent,canActivate:[AuthGuard] },
      { path: 'listadecolaboradores', component: ListaDeColaboradoresComponent,canActivate:[AuthGuard] },
      { path: 'configuracion', component: ConfiguracionComponent,canActivate:[AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class PlataformaRoutingModule { }

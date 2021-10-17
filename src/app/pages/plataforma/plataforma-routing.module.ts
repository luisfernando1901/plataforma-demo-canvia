import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeColaboradoresComponent } from './subPages/colaboradores/lista-de-colaboradores/lista-de-colaboradores.component';
import { HistorialdereportesComponent } from './subPages/corrales/historialdereportes/historialdereportes.component';
import { NuevoformularioComponent } from './subPages/corrales/nuevoformulario/nuevoformulario.component';
import { InicioComponent } from './subPages/inicio/inicio.component';
import { SidebarMenuComponent } from './subPages/sidebar-menu/sidebar-menu.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: '', 
    component: SidebarMenuComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'corrales/nuevoformulario', component: NuevoformularioComponent },
      { path: 'corrales/historialdereportes', component: HistorialdereportesComponent },
      { path: 'listadecolaboradores', component: ListaDeColaboradoresComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }

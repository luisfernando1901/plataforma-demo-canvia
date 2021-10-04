import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './subPages/inicio/inicio.component';
import { SidebarMenuComponent } from './subPages/sidebar-menu/sidebar-menu.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: '', 
    component: SidebarMenuComponent,
    children: [
      { path: 'inicio', component: InicioComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  isCollapsed = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  // Función para el cierre de sesión
  logout(){
    sessionStorage.removeItem('comiteToken');
    sessionStorage.removeItem('comiteUserName');
    this.router.navigate(['/login']);
  }

}

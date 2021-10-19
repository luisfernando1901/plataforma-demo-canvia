import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  actualizationHour = new Date().toISOString();
  constructor() { }

  ngOnInit(): void {
    console.log(this.actualizationHour);
  }

}

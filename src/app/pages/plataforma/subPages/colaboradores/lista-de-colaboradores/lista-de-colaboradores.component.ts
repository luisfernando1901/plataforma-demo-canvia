import { Component, OnInit } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';

@Component({
  selector: 'app-lista-de-colaboradores',
  templateUrl: './lista-de-colaboradores.component.html',
  styleUrls: ['./lista-de-colaboradores.component.css']
})
export class ListaDeColaboradoresComponent implements OnInit {
  admin = false;
  tableloadingIndicator = true;
  colaborators = [
    {
      nombre: '-',
      email: '-',
      rol: '-'
    }
  ];
  searchValue = '';
  visible = false;
  listOfData = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.colaborators];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.colaborators.filter((item) => item.nombre.indexOf(this.searchValue) !== -1);
  }
  constructor(private _mongodb: MongodbService) {
    this.getColaboratorsList();
  }

  ngOnInit(): void {
    this.admin = sessionStorage.getItem('admin') == 'true' ? true : false;
  }

  async getColaboratorsList() {
    let result: any = await this._mongodb.getColaboratorsList();
    this.colaborators = result.usersList;
    this.tableloadingIndicator = false;
    this.reset();
  }

  async deleteColaborator(userdata: any) {
    console.log(userdata);
    let result: any = await this._mongodb.deleteColaborator(userdata);
    console.log(result);
    window.location.reload();
  }
}

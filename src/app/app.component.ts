import { Component, OnInit, VERSION } from '@angular/core';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  employees = [];

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    console.log('init');
    // cargamos los datos en el componente
    this.employees = this.employeesService.getAll();
  }

  addEmployee() {}

  removeEmployee(employee) {}
}

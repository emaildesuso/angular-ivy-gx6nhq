import { Injectable } from '@angular/core';
import * as M from 'moment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  today = M('2000-01-01');
  employees = [
    {
      name: 'Empleado',
      surnameA: 'Numero',
      surnameB: 'Uno',
      dni: '00000000A',
      email: 'contable1@nowhere.es',
      age: M().diff(M('1967-01-01'), 'y'), // numero
      birthday: M('1960-01-01'), // fechas tipo Moment
      department: 'Contabilidad',
    },
    {
      name: 'Empleado',
      surnameA: 'Numero',
      surnameB: 'Dos',
      dni: '00000001B',
      email: 'administrador@nowhere.es',
      age: M().diff(M('1970-01-01'), 'y'),
      birthday: M('1970-01-01'),
      department: 'Administración',
    },
    {
      name: 'Empleado',
      surnameA: 'Numero',
      surnameB: 'Tres',
      dni: '00000002C',
      email: 'shop@nowhere.es',
      age: M().diff(M('1980-01-01'), 'y'),
      birthday: M('1980-01-01'),
      department: 'Tienda',
    },
  ];

  constructor() {}

  // retorna la lista de empleados
  getAll() {
    return this.employees;
  }

  // agrega un nuevo empleado a la lista
  addEmployee(employee) {
    // agregamos el empleado a la lista
    this.employees.push(employee);

    // indicamos el exito de la operacion
    return true;
  }

  // elimina un empleado, dado su dni
  removeEmployee(dni) {
    // localizamos el empleados en la lista
    var index = this.employees.findIndex((employee) => employee.dni === dni);
    // si lo encontramos
    if (index !== -1) {
      // elimina el empleado
      this.employees.splice(index, 1);
      // ok
      return true;
    }

    // not found
    return false;
  }

  // actualiza el empleado segun dni
  updateEmployee(dni, employee) {
    // localizamos el empleados en la lista
    var index = this.employees.findIndex((employee) => employee.dni === dni);
    // si lo encontramos
    if (index !== -1) {
      // reemplazar al empleado con el nuevo registro
      this.employees.splice(index, 1, employee);
      // ok
      return true;
    }

    // not found
    return false;
  }
}

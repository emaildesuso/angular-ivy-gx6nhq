import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesService {
  employees = [
    {
      id: 0,
      name: 'Contable',
      surname: 'Numero Uno',
      dni: '00000000A',
      email: 'contable1@nowhere.es',
      age: '45',
      department: 'Contabilidad',
    },
    {
      id: 0,
      name: 'Administrador',
      surname: 'General de la Aplicación',
      dni: '00000001B',
      email: 'administrador@nowhere.es',
      age: '45',
      department: 'Administración',
    },
    {
      id: 0,
      name: 'Tienda',
      surname: 'Carniceria',
      dni: '00000002C',
      email: 'shop@nowhere.es',
      age: '45',
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
    this.employees.push(employee);
  }

  // elimina un empleado, dado su id
  removeEmployee(id) {
    // localizamos el empleados en la lista
    var index = this.employees.findIndex((employee) => employee.id === id);
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
}

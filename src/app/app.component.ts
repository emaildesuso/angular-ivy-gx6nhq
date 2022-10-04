import { Component, OnInit, VERSION } from '@angular/core';
import { EmployeesService } from './employees.service';
import * as M from 'moment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // mi listado de empleados
  employees = [];

  // propiedades para los controles de texto para el alta del empleado
  dni: string = '';
  name: string = '';
  surnameA: string = '';
  surnameB: string = '';
  email: string = '';
  birthday: string = '';
  department: string = '';

  editMode = false;

  // propiedades para los controles de texto para el alta del empleado
  dniEdit: string = '';
  nameEdit: string = '';
  surnameAEdit: string = '';
  surnameBEdit: string = '';
  emailEdit: string = '';
  birthdayEdit: string = '';
  departmentEdit: string = '';

  // necesitamos acceder al servicio de empleados para gestionar la lista
  constructor(private employeeService: EmployeesService) {}

  // inicializacion, obtener la lista de empleados
  ngOnInit() {
    // obtener la lista de empleados
    this.employees = this.employeeService.getAll();
  }

  // limpia el formulario de agregar un empleado
  clearAddForm() {
    this.dni = '';
    this.name = '';
    this.surnameA = '';
    this.surnameB = '';
    this.email = '';
    this.birthday = '';
    this.department = '';
  }

  // agrega un empleado, verificando que se ha indicado un dni, nombre y un email
  addEmployee() {
    // verificamos los datos de entrada, obligatoriedad y validaz
    if (this.dni === '') {
      return alert('Debe indicar el DNI de forma obligatoria');
    }

    if (this.name === '') {
      return alert('Debe indicar el nombre del empleado de forma obligatoria');
    }

    if (this.email === '') {
      return alert('Debe indicar el email de forma obligatoria');
    } else {
      // el email lo contrastamos con un patron para verificar su validez
      let re =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (re.test(this.email) === false) {
        return alert('El correo electrónico que ha indicado no es válido');
      }
    }

    // en caso de haber indicado la fecha de nacimiento, calculamos la edad
    let birthday = null;
    let age = null;
    let today = M();

    if (this.birthday !== '') {
      birthday = M(this.birthday);
      age = today.diff(birthday, 'y');
    }

    // procedemos a añadirlo
    if (
      !this.employeeService.addEmployee({
        dni: this.dni,
        name: this.name,
        surnameA: this.surnameA,
        surnameB: this.surnameB,
        email: this.email,
        age: age,
        birthday: birthday,
        department: this.department,
      })
    ) {
      // error
      alert('Error al agregar al empleado');
    } else {
      this.clearAddForm();
    }
  }

  // eliminar un empleado, sin control de ningun tipo
  removeEmployee(employee, index) {
    this.setEditMode(false);
    this.clearEditForm();

    if (!this.employeeService.removeEmployee(employee.dni)) {
      alert('Error al eliminar el empleado');
    }
  }

  // cancelar editMode
  setEditMode(mode) {
    this.editMode = mode;
  }

  // limpia el formulario de edicion
  clearEditForm() {
    this.dniEdit = '';
    this.nameEdit = '';
    this.surnameAEdit = '';
    this.surnameBEdit = '';
    this.emailEdit = '';
    this.birthdayEdit = '';
    this.departmentEdit = '';
  }

  // cambiamos a modo agregar y limpiamos el formulario
  cancelEditMode() {
    this.setEditMode(false);
    this.clearEditForm();
    this.clearAddForm();
  }

  // seleccionar un empleado para edicion
  selectEmployee(employee, index) {
    // limpiamos el control
    this.clearEditForm();

    // habilitamos la edicion
    this.setEditMode(true);

    // fijamos los datos del empleado
    this.dniEdit = employee.dni;
    this.nameEdit = employee.name;
    this.surnameAEdit = employee.surnameA;
    this.surnameBEdit = employee.surnameB;
    this.emailEdit = employee.email;
    this.birthdayEdit = employee.birthday?.format('YYYY-MM-DD'); // el control utiliza el formato texto de la fecha
    this.departmentEdit = employee.department;
  }

  // verificar que el DNI que se indica no esta ya en la lista de empleados
  checkDNI(dni) {
    if (this.employees.findIndex((employee) => employee.dni === dni) >= 0) {
      this.dni = ''; // limpiar el input en caso de ya existir
      return alert('El DNI ya existe en la lista de empleados');
    }

    // eliminamos la puntuacion
    let res = /[^a-zA-Z0-9]/g;
    this.dni = this.dni.replace(res, '');

    // si esta vacio
    if (this.dni.length === 0) {
      return;
    }
    // no hay control de validez, pero seria cuestion de incluir un patron como en el caso del email
    // patron extraido de https://miguelangelmedina.es/37-expresion-regular-para-validar-el-formato-de-un-nif-nie
    let re =
      /((([X-Z])|([LM])){1}([-]?)((\d){7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]))/;
    if (re.test(this.dni) === false) {
      return alert('El DNI indicado no es válido');
    }
  }

  // modificar un empleado, verificando que se ha indicado un nombre y un email, el dni no se toca
  updateEmployee() {
    // verificamos los datos al igual que en el alta
    if (this.nameEdit === '') {
      return alert('Debe indicar el nombre del empleado de forma obligatoria');
    }

    if (this.emailEdit === '') {
      return alert('Debe indicar el email de forma obligatoria');
    } else {
      // el email lo contrastamos con un patron para verificar su validez
      let re =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (re.test(this.emailEdit) === false) {
        return alert('El correo electrónico que ha indicado no es válido');
      }
    }

    // en caso de haber indicado la fecha de nacimiento, calculamos la edad, y fijamos la fecha en tipo MOMENT
    let birthday = null;
    let age = null;
    let today = M();

    if (this.birthdayEdit !== '') {
      birthday = M(this.birthdayEdit);
      age = today.diff(birthday, 'y');
    }

    // procedemos a añadirlo en el servicio, creamo un objeto empleado (esto, mejor hecho, se utiliza una clase :(  )
    if (
      !this.employeeService.updateEmployee(this.dniEdit, {
        dni: this.dniEdit,
        name: this.nameEdit,
        surnameA: this.surnameAEdit,
        surnameB: this.surnameBEdit,
        email: this.emailEdit,
        age: age,
        birthday: birthday,
        department: this.departmentEdit,
      })
    ) {
      // error
      alert('Error al agregar al empleado');
    } else {
      // volver a modo agregar
      this.cancelEditMode();
    }
  }
}

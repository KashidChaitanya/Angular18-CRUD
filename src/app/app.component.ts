import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      this.employeeList = JSON.parse(oldData);
    }
  }

  reset() {
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empid),
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pinCode: new FormControl(this.employeeObj.pinCode, [Validators.required, Validators.minLength(6)]),
      state: new FormControl(this.employeeObj.state),
    });
  }

  onSave() {
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      this.employeeForm.controls['empid'].setValue(this.employeeList.length + 1);
    }
    this.employeeList.unshift(this.employeeForm.value);
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.reset();
  }

  onEdit(item: EmployeeModel) {
    this.employeeForm.patchValue(item);
  }

  onUpdate() {
    const index = this.employeeList.findIndex((m) => m.empid === this.employeeForm.controls['empid'].value);
    if (index !== -1) {
      this.employeeList[index] = this.employeeForm.value;
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      this.reset();
    }
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      const index = this.employeeList.findIndex((m) => m.empid === id);
      if (index !== -1) {
        this.employeeList.splice(index, 1);
        localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      }
    }
  }
}

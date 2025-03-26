import { Injectable } from '@angular/core';
import { IndexedDbService } from './indexed-db.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private dbService: IndexedDbService) {}

  // **Add Employee**
  addEmployee(employee: Employee): Promise<void> {
    return this.dbService.addEmployee(employee);
  }

  // **Get All Employees**
  getEmployees(): Promise<Employee[]> {
    return this.dbService.getAllEmployees();
  }

  // **Get Single Employee by ID**
  getEmployeeById(id: number): Promise<Employee | undefined> {
    return this.dbService.getEmployeeById(id);
  }

  // **Update Employee**
  updateEmployee(updatedEmployee: Employee): Promise<void> {
    return this.dbService.updateEmployee(updatedEmployee);
  }

  // **Delete Employee**
  deleteEmployee(id: number): Promise<void> {
    return this.dbService.deleteEmployee(id);
  }
}

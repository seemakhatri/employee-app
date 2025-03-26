import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

interface Employee {
  name: string;
  role: string;
  startDate: string;
  endDate?: string;
  isDeleted?: boolean;
}
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [
    { name: 'John Doe', role: 'Software Engineer', startDate: '2021-06-15' },
    { name: 'Jane Smith', role: 'Product Manager', startDate: '2020-04-10' },
    { name: 'Alice Johnson', role: 'UI/UX Designer', startDate: '2019-08-22', endDate: '2023-01-05' },
    { name: 'Bob Williams', role: 'QA Engineer', startDate: '2018-02-14', endDate: '2022-12-30' },
    { name: 'Charlie Brown', role: 'Data Analyst', startDate: '2023-02-10' }
  ];

  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];
  deletedEmployee: Employee | null = null;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.filterEmployees();
  }

  filterEmployees() {
    this.currentEmployees = this.employees.filter(emp => !emp.endDate);
    this.previousEmployees = this.employees.filter(emp => emp.endDate);
  }

  deleteEmployee(employee: Employee) {
    this.deletedEmployee = employee;
    this.employees = this.employees.filter(emp => emp !== employee);
    this.filterEmployees();

    // Show Snackbar with Undo
    this.snackbarService.showSnackbar('Employee data has been deleted', 'Undo', () => {
      if (this.deletedEmployee) {
        this.employees.push(this.deletedEmployee);
        this.filterEmployees();
      }
    });
  }

  onSwipeLeft(employee: Employee, listType: 'current' | 'previous') {
    employee.isDeleted = true; // Move the card left, showing the red background
  
    setTimeout(() => {
      if (listType === 'current') {
        this.currentEmployees = this.currentEmployees.filter(emp => emp !== employee);
      } else {
        this.previousEmployees = this.previousEmployees.filter(emp => emp !== employee);
      }
  
      // Show Snackbar with Undo option
      this.snackbarService.showSnackbar('Employee data has been deleted', 'Undo', () => {
        employee.isDeleted = false;
  
        if (listType === 'current') {
          this.currentEmployees.push(employee);
        } else {
          this.previousEmployees.push(employee);
        }
      });
    }, 500); // 500ms delay before removing
  }
  
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Datepicker } from 'flowbite-datepicker';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { BottomSheetComponent } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, AfterViewInit {
  employee: Employee = {
    id: 0,
    name: '',
    role: '',
    startDate: new Date(),
    endDate: null
  };

  selectedRole: string = '';
  isEditing: boolean = false;

  constructor(
    private bottomSheet: MatBottomSheet,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadEmployee(parseInt(id));
    }
  }

  async loadEmployee(id: number) {
    const employeeData = await this.employeeService.getEmployeeById(id);
    if (employeeData) {
      this.employee = employeeData;
      this.selectedRole = employeeData.role;
    }
  }

  openRoleBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetComponent, {
      panelClass: 'custom-bottom-sheet'
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result) {
        this.selectedRole = result;
        this.employee.role = result;
      }
    });
  }

  ngAfterViewInit(): void {
    const startDateInput = document.getElementById('datepicker-range-start') as HTMLInputElement;
    const endDateInput = document.getElementById('datepicker-range-end') as HTMLInputElement;

    if (startDateInput) {
      new Datepicker(startDateInput, { autohide: true, format: 'dd MMM yyyy' });
    }

    if (endDateInput) {
      new Datepicker(endDateInput, { autohide: true, format: 'dd MMM yyyy' });
    }
  }

  async submitForm() {
    if (this.employee.name && this.employee.role && this.employee.startDate) {
      if (this.isEditing) {
        await this.employeeService.updateEmployee(this.employee);
      } else {
        await this.employeeService.addEmployee(this.employee);
      }
      this.router.navigate(['/employee-list']);
    } else {
      alert('Please fill all required fields');
    }
  }
}

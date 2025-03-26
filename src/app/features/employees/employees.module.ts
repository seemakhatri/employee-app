import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import {  HammerModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatBottomSheetModule,
    HammerModule,
    FormsModule
    
    
  ]
})
export class EmployeesModule { }

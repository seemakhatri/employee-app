import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', loadChildren: () => import('./features/employees/employees.module').then(m => m.EmployeesModule) },
  { path: '', redirectTo: '/employees', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

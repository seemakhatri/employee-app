import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';



@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {

  selectedRole: string = '';

  constructor(private bottomSheet: MatBottomSheet) {}


  openRoleBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetComponent, {
          panelClass: 'custom-bottom-sheet'
    });

    bottomSheetRef.afterDismissed().subscribe(result => {

      if (result) {
        this.selectedRole = result;
      }
    });
  }
}

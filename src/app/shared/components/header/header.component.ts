import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() headerTitle: string = 'Employee List';
  @Input() showDeleteIcon: boolean = false;
  @Output() deleteEmployeeEvent = new EventEmitter<void>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setHeaderTitleAndIcon(this.router.url);
      }
    });
  }

  setHeaderTitleAndIcon(url: string) {
    if (url.includes('/employee-form/')) {
      this.headerTitle = 'Edit Employee Details';
      this.showDeleteIcon = true;
    } else if (url.includes('employee-form')) {
      this.headerTitle = 'Add Employee Details';
      this.showDeleteIcon = false;
    } else {
      this.headerTitle = 'Employee List';
      this.showDeleteIcon = false;
    }
  }

  deleteEmployee() {
    this.deleteEmployeeEvent.emit();
  }
}

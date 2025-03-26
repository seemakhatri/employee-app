import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'EmployeeDB';
  private storeName = 'employees';
  private db!: IDBDatabase;

  constructor() {
    this.initDB();
  }

  private initDB() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result;
      if (!this.db.objectStoreNames.contains(this.storeName)) {
        this.db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };

    request.onerror = (event: any) => {
      console.error('Error opening IndexedDB:', event);
    };
  }


  addEmployee(employee: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(employee);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event);
    });
  }

// **Get All Employees (Convert Dates Back)**
getAllEmployees(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      const employees = request.result.map((emp: any) => ({
        ...emp,
        startDate: new Date(emp.startDate), // Convert string to Date
        endDate: emp.endDate ? new Date(emp.endDate) : null // Convert if exists
      }));
      resolve(employees);
    };

    request.onerror = (event) => reject(event);
  });
}

  getEmployeeById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event);
    });
  }



// **Update Employee (Ensure Dates Are Stored as Strings)**
updateEmployee(employee: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    const employeeData = {
      ...employee,
      startDate: employee.startDate.toISOString(), 
      endDate: employee.endDate ? employee.endDate.toISOString() : null
    };

    const request = store.put(employeeData);
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event);
  });
}

  deleteEmployee(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event);
    });
  }
}

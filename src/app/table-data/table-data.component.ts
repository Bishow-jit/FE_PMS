import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.css'
})
export class TableDataComponent implements OnInit  {
  usersData : any[] = [];
  isLoading: boolean = true;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const apiUrl = 'https://reqres.in/api/users';
    this.http.get<any>(apiUrl).subscribe(
      response => {
        // console.log('API response:', response);
        this.usersData = response.data; 
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }
}

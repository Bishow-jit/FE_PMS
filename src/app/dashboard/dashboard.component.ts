import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  projectData : any[] = [];
  isLoading: boolean = true;
  baseUrl : string ="http://localhost:8080/api/v1";
  
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.fetchProjectData();
  }

  fetchProjectData(): void {

    const now = new Date();

    // Get the first day of the current month
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('.')[0];
    console.log('startDate', startDate);

    // Get the last day of the current month
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('.')[0];
    console.log('endDate', endDate);
    const apiUrl = `${this.baseUrl}/project/withinDateRange?StartDateTime=${startDate}&EndDateTime=${endDate}`;
    console.log('api', apiUrl)
    this.http.get(apiUrl).subscribe((response: any) => {
      console.log('resp', response);
      this.projectData = response;
      console.log('projectdata', this.projectData)
      this.isLoading = false;
    });

  }
}

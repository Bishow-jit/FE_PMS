import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  projectData : any[] = [];
  isLoading: boolean = true;
  startDateTime : string = "";
  endDateTime : string = "";
  baseUrl : string ="http://localhost:8080/api/v1";
  
  constructor(private http:HttpClient, private router:Router){}
  ngOnInit(): void {
    this.fetchProjectData();
  }

  searchProjects(){
    if(this.startDateTime && this.endDateTime){
      let startDate = new Date (this.startDateTime).toISOString().split('.')[0];
      let endDate = new Date (this.endDateTime).toISOString().split('.')[0];
      console.log('parameter',{
        startDate,
        endDate
      })
      const apiUrl = `${this.baseUrl}/project/withinDateRange?StartDateTime=${startDate}&EndDateTime=${endDate}`;
      this.http.get(apiUrl).subscribe((response: any) => {
        this.projectData = response;
        this.isLoading = false;
        console.log(this.projectData);
      });
    }
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

  addMember(id:number){
    if(id){
      this.router.navigateByUrl('/assign-member/'+id);
    }
  }
}

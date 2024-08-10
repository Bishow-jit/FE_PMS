import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailDialogComponent } from '../project-detail-dialog/project-detail-dialog.component';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { DeletePeojectComponent } from '../delete-peoject/delete-peoject.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  projectData : any;
  currentUserData : any;
  isProjectOwner : boolean = false;
  isLoading: boolean = true;
  startDateTime : string = "";
  endDateTime : string = "";
  userMap: Map<number, boolean> = new Map();
  baseUrl : string ="http://localhost:8080/api/v1";
  
  
  constructor(private http:HttpClient, private router:Router,public dialog: MatDialog){}
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
        this.fetchCurentUserDetails();
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
      this.fetchCurentUserDetails();
    });

  }

  fetchCurentUserDetails(): void{
    this.http.get(this.baseUrl+"/loggedInUser").subscribe((response:any)=>{
      if(response){
        this.currentUserData = response;
        if(this.projectData && this.currentUserData){
         for(let project of this.projectData){
          if(project.owner.id === this.currentUserData.id){
            this.userMap.set(this.currentUserData.id,true);
          }else{
            this.userMap.set(this.currentUserData.id,false);
          }
         }
      }
      }
    },(error)=>{
      console.log("Error while getting users Data",error);
    })
  
  }

  addMember(id:number){
    if(id){
      this.router.navigateByUrl('/assign-member/'+id);
    }
  }

  openProjectDetail(project: any): void {
    this.dialog.open(ProjectDetailDialogComponent, {
      width :'60vw',
    maxHeight: '80vh',
      data: { project },
      panelClass: 'custom-dialog-container' // Add a custom class if needed
    });
  }

 

  onEditClick(project:any):void {
   this.dialog.open(UpdateProjectComponent,{
    width :'60vw',
    maxHeight: '80vh',
    data:{project},
    panelClass: 'custom-dialog-container' 
   });
  }

  OnDelete(project:any):void{
    this.dialog.open(DeletePeojectComponent,{
      width :'35vw',
      maxHeight: '20vh',
      data:{project},
      panelClass: 'custom-dialog-container' 
     });
  }


}

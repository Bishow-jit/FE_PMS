import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {


  constructor(private http:HttpClient, private router : Router){}

  baseUrl : string ="http://localhost:8080/api/v1";

  name : string = "";
  intro : string = "";
  status : number = -1;
  startDateTime : string = "";
  endDateTime : string = "";
 
  createProject(){
    debugger
    if (this.endDateTime !=='' && this.startDateTime) {
      if (new Date(this.endDateTime) <= new Date(this.startDateTime)) {
        alert('End Date must be greater than Start Date');
        return;
      }
    }
    let projectDto = {
      "name":this.name,
      "intro":this.intro,
      "status":this.status,
      "startDateTime": new Date(this.startDateTime),
      "endDateTime":new Date(this.endDateTime),
    }

    this.http.post(this.baseUrl + "/create/project", projectDto).subscribe(
      (response: any) => {
        if (response.data) {
          alert(response.msg);
          this.router.navigate(['/layout']);
        }else{
          alert(response.msg)
        }
      },
      error => {
        console.error('Error creating project:', error);
        alert('Failed to create project. Please try again.');
      }
    );
  }
}

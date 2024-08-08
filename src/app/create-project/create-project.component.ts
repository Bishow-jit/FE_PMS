import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';

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
    let projectDto = {
      "name":this.name,
      "intro":this.intro,
      "status":this.status,
      "startDateTime":this.startDateTime,
      "endDateTime":this.endDateTime,
    }

    this.http.post(this.baseUrl + "/create/project", projectDto).subscribe(
      (response: any) => {
        if (response) {
          alert("Project Created Successfully");
          this.router.navigate(['/layout']);
        }
      },
      error => {
        console.error('Error creating project:', error);
        alert('Failed to create project. Please try again.');
      }
    );
  }
}

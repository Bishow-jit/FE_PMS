import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent implements OnInit {


  constructor(
    private router:Router,
    private http:HttpClient,
    public dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  id : any;
  name : any;
  intro : any;
  status : any;
  startDateTime : any;
  endDateTime : any;
  owner:any
  baseUrl : string ="http://localhost:8080/api/v1";


  ngOnInit(): void {
    console.log('project Data',this.data.project)
    this.id=this.data.project.id;
    this.name=this.data.project.name;
    this.intro=this.data.project.intro;
    if(this.data.project.status==='PRE'){
      this.status=0
    }
    if(this.data.project.status==='START'){
      this.status=1
    }
    if(this.data.project.status==='END'){
      this.status=2
    }
    this.startDateTime = new Date(this.data.project.startDateTime).toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
  });
    this.endDateTime=new Date(this.data.project.endDateTime).toLocaleDateString('en-US',{
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
  });
   this.owner = this.data.project.owner;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let id = this.id;
    let projectDto ={
      "id":this.id,
      "name":this.name,
      "intro":this.intro,
      "status":this.status,
      "startDateTime": new Date(this.startDateTime),
      "endDateTime":new Date(this.endDateTime),
      "owner":this.owner
    }

    if(id && projectDto){
       this.http.put(this.baseUrl+"/update/project/"+id,projectDto).subscribe((response:any)=>{
        if(response){
          alert("Update Successful");
          this.router.navigateByUrl('/layout');
          this.onClose();
        }
       },(error)=>{
        console.log("Error While Updating Project Data",error);
       })
    }

  }


  
}

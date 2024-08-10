import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { response } from 'express';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-assign-member',
  templateUrl: './assign-member.component.html',
  styleUrl: './assign-member.component.css'
})
export class AssignMemberComponent implements OnInit {
  baseUrl : string ="http://localhost:8080/api/v1";
  project: any;
  users: any[] = [];
  selectedMembers: any[] = [];;
  assignedMembers: any[] = [];
  dropdownSettings:IDropdownSettings={};
  isButtonDisable : boolean = false;

  id : number = -1;
  name : string =""
  constructor (private route: ActivatedRoute , private http : HttpClient){

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.fetchProjectDataId(id);
      this.getUserslist();
    }
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      enableCheckAll: false,
      limitSelection: 5
    };
  }

  fetchProjectDataId(id:string): void {
    this.http.get(this.baseUrl+"/project/"+id).subscribe((response:any)=>{
      if(response){
        this.project = response;
        this.assignedMembers = this.project.members
        console.log('data',this.project)
        console.log('members data',  this.assignedMembers)
        if( this.assignedMembers.length >= 5){
          this.isButtonDisable = true
        } 
      }
     },(error)=>{
      console.log('Error while getting project data',error);
     });
  }


  getUserslist(){
    this.http.get(this.baseUrl+"/getAllUsers").subscribe((response:any)=>{
     if(response){
      this.users = response
      console.log("all members", this.users)
     }
    },(error)=>{
      console.log("Error while getting users data", error)
    })
  }

  onItemSelect(item: any) {
    if (this.selectedMembers.length >= 5) {
      this.selectedMembers.pop();
    } else {
      // console.log('Selected Item:', item);
      if (!this.selectedMembers) {
        this.selectedMembers = [];
      }
      this.selectedMembers.push(item);
    }
  }

  onDeSelect(item: any) {
    console.log('Deselected Item:', item);
    this.selectedMembers = this.selectedMembers.filter(member => member.id !== item.id);
  }

  assign(){
    let id = this.route.snapshot.paramMap.get('id');
    if(this.selectedMembers && id){
      this.http.post(this.baseUrl+"/add/project/members/"+id,this.selectedMembers).subscribe((response:any)=>{
      if(response.data){
        alert(response.msg)
        // this.assignedMembers = response.data.members;
        // console.log("members",this.assignedMembers);
      }
      },(error)=>{
        console.log("Error While posting member assign data",error)
      })
    }
  }

  removeMember(id:number){

  }
}

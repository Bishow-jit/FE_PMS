import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name : string = "";
  email : string = "";
  mobileNo : string = "";
  gender : string = "";
  username : string = "";
  password : string = "";

  baseUrl : string ="http://localhost:8080/api/v1";

  constructor(private http:HttpClient){

  }

  register(){
    let userDto ={
      "name":this.name,
      "email":this.email,
      "mobileNo":this.mobileNo,
      "gender":this.gender,
      "username":this.username,
      "password":this.password
    }

    this.http.post(baseUrl+)
  }
}

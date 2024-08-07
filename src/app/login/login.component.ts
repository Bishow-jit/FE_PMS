import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username : string = "";
  password : string = "";

  constructor(private http:HttpClient){
    
  }

  login(){
    console.log("login");
    alert("login clicked");
  }
}

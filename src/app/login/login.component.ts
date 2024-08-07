import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username : string = "";
  password : string = "";
  baseUrl : string ="http://localhost:8080/api/v1";
  constructor(private http:HttpClient, private router : Router){
    
  }

  login(){
    let loginDto ={
      "username":this.username,
      "password":this.password
    }
    this.http.post(this.baseUrl+"/login",loginDto).subscribe((response:any)=>{
     if(response.statusCode === 200){
      alert("Login Success");
      localStorage.setItem("token",response.accessToken);
      this.router.navigateByUrl('/dashboard')
     }else{
      alert(response);
     }
    });
  }
}

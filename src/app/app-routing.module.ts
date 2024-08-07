import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { register } from 'module';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path :'login',
    component : LoginComponent
  },
  {
    path :'',
    redirectTo :'login',
    pathMatch : 'full'
  },
  {
    path :'',
    component : LayoutComponent,
    children : [
      {
        path :'dashboard',
        component : DashboardComponent
      }
    ]
  },
  {
    path :'register',
    component : RegisterComponent
  },
  {
    path :"**",
    component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

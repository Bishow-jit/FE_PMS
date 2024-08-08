import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { TableDataComponent } from './table-data/table-data.component';
import { CreateProjectComponent } from './create-project/create-project.component';

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
    path :'layout',
    component : LayoutComponent,
    children : [
      {
        path :'dashboard',
        component : DashboardComponent
      }
    ]
  },
  {
    path : 'createProject',
    component : CreateProjectComponent
  },
  {
    path :'register',
    component : RegisterComponent
  },
  {
    path : 'tabledata',
    component :TableDataComponent
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

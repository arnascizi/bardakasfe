import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'evaluation', component: EvaluationFormComponent },
      { path: 'students', component: StudentDetailsComponent },
      { path: 'teachers', component: TeachersPageComponent },
      { path: 'teachers/:id', component: TeacherDetailsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

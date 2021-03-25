import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { StudentDropdownComponent } from './student-dropdown/student-dropdown.component';
import { StudentsPageComponent } from './students-page/students-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'evaluation', component: EvaluationFormComponent },
      { path: 'evaluation/:id', component: EvaluationFormComponent },
      { path: 'students', component: StudentsPageComponent },
      { path: 'teachers', component: TeachersPageComponent },
      { path: 'teachers/:id', component: TeacherDetailsComponent },
      { path: 'dropdown', component: StudentDropdownComponent },
      { path: 'dropdown/:id', component: StudentDropdownComponent },
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

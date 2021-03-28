import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { StudentDropdownComponent } from './student-dropdown/student-dropdown.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/evaluate' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'evaluation', component: EvaluationFormComponent },
  { path: 'evaluation/:id', component: EvaluationFormComponent },
  { path: 'students', component: StudentDetailsComponent },
  { path: 'teachers', component: TeachersPageComponent },
  { path: 'teachers/:id', component: TeacherDetailsComponent },
  { path: 'evaluate', component: StudentDropdownComponent },
  { path: 'evaluate/:id', component: StudentDropdownComponent },
  { path: 'overview', component: OverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

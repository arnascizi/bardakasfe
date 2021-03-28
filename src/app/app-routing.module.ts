import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { StudentDropdownComponent } from './student-dropdown/student-dropdown.component';
import { OverviewComponent } from './overview/overview.component';
import { StudentsPageComponent } from './students-page/students-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/evaluate' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'evaluation/new/:studentId', component: EvaluationFormComponent },
  { path: 'evaluation/:evaluationId', component: EvaluationFormComponent },
  { path: 'students', component: StudentsPageComponent },
  { path: 'teachers', component: TeachersPageComponent },
  { path: 'teachers/:id', component: TeacherDetailsComponent },
  { path: 'evaluate', component: StudentDropdownComponent },
  { path: 'evaluate/:id', component: StudentDropdownComponent },
  { path: 'overview', component: OverviewComponent },
  { path: '**', redirectTo: '/evaluate' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

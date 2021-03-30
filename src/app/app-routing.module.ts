import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { AuthGuard } from './guards/auth.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { RegisterComponent } from './register/register.component';
import { StudentDropdownComponent } from './student-dropdown/student-dropdown.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { StudentAddComponent } from './student-add/student-add.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/evaluate' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'evaluation/new/:studentId', component: EvaluationFormComponent, canActivate: [TeacherGuard, AuthGuard] },
  { path: 'evaluation/:evaluationId', component: EvaluationFormComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsPageComponent, canActivate: [TeacherGuard, AuthGuard] },
  { path: 'teachers', component: TeachersPageComponent, canActivate: [TeacherGuard, AuthGuard] },
  { path: 'teachers/:id', component: TeacherDetailsComponent, canActivate: [AuthGuard] },
  { path: 'evaluate', component: StudentDropdownComponent, canActivate: [AuthGuard] },
  { path: 'evaluate/:id', component: StudentDropdownComponent, canActivate: [AuthGuard] },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'students/add', component: StudentAddComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/evaluate' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

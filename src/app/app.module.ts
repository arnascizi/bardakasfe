import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { RegisterComponent } from './register/register.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { TeachersInfoComponent } from './teachers-info/teachers-info.component';
import { HttpErrorInterceptor } from './http-interceptor/http-error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AlertComponent } from './alert/alert.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentDropdownComponent } from './student-dropdown/student-dropdown.component';
import { StudentDropdownEvaluationsComponent } from './student-dropdown-evaluations/student-dropdown-evaluations.component';
import { OverviewComponent } from './overview/overview.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { StudentsInfoComponent } from './students-info/students-info.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerLoadingComponent } from './spinner-loading/spinner-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    TeacherDetailsComponent,
    TeachersPageComponent,
    TeachersInfoComponent,
    NotificationModalComponent,
    AlertComponent,
    StudentDropdownComponent,
    StudentDropdownEvaluationsComponent,
    EvaluationFormComponent,
    OverviewComponent,
    StudentsPageComponent,
    StudentsInfoComponent,
    SpinnerLoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

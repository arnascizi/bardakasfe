import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { AlertService } from './../services/alert.service';
import { AlertType } from './../shared/alert';
import { Teacher } from './../shared/teacher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    this.alertService.close();
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.form.value.username, this.form.value.password)
      .pipe(first(),
        catchError(err => {
          this.loading = false;
          this.handleError(err);
          return EMPTY;
        }))
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          this.authService.userValue.isTeacher ?
            this.notificationService.success('You are now ready to evaluate students', `Welcome
              ${this.authService.userValue.name}!`) :
            this.notificationService.success('You are now ready to view students evaluations', `Welcome
              ${this.authService.userValue.name}!`);
        }
      });
  }

  private handleError(error: ErrorEvent | HttpErrorResponse): void {
    if (!(error.error instanceof ErrorEvent)) {
      if (error.error.message !== undefined) {
        this.alertService.show(error.error.message, AlertType.Error);
      } else {
        this.alertService.show("Something went wrong", AlertType.Error);
      }
    }
  }

}


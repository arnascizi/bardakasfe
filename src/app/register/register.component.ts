import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { NotificationService } from '../services/notification.service';
import { AlertType } from '../shared/alert';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  isATeacher: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$'),
          Validators.minLength(8)
        ],
        updateOn: 'blur'
      }],
      isTeacher: this.isATeacher
    }
    );
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
    this.authService.register(this.form.value)
      .pipe(
        first(),
        catchError(err => {
          this.loading = false;
          this.handleError(err);
          return EMPTY;
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { relativeTo: this.route });
          this.notificationService.success('You can now login' , 'Account registration is complete');
        },
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

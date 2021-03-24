import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AlertType } from '../shared/alert';
import { TeacherService } from './../services/teacher.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private alertService: AlertService
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
    this.teacherService.addNewTeacher(this.form.value)
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
        },
      });
  }

  handleError(error: any) {
    if (!(error.error instanceof ErrorEvent)) {
      if (error.error.message !== undefined) {
        this.alertService.show(error.error.message, AlertType.Error);
      } else {
        this.alertService.show("Something went wrong", AlertType.Error);
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from './../services/alert.service';
import { StudentService } from '../services/student.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertType } from '../shared/alert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})

export class StudentAddComponent implements OnInit {
  studentForm: FormGroup;
  isSubmitted: boolean = false;
  maxCharsForText: number = 64;


  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['',
        {
          validators:
            [Validators.required,
            Validators.maxLength(this.maxCharsForText)]
        }],
      surname: ['', {
        validators:
          [Validators.required,
          Validators.maxLength(this.maxCharsForText)]
      }]
    });
  }

  get formControls(): any {
    return this.studentForm.controls;
  }


  submitForm(): void {
    this.alertService.close();
    this.isSubmitted = true;
    if (this.studentForm.invalid) {
      return;
    }
    this.addStudentForm();
  }

  private addStudentForm(): void {
    this.studentService
      .addStudent(this.studentForm.value)
      .pipe(
        take(1)
      )
      .subscribe(
        res => {
          this.toastrService.success("Student added!", "Success")
          this.router.navigateByUrl(`/students`);
        },
        err => {
          this.handleError(err);
        }
      );
  }

  private handleError(error: ErrorEvent | HttpErrorResponse) {
    if (!(error.error instanceof ErrorEvent) && error.error.status === 422) {
      if (error.error.message !== undefined) {
        this.alertService.show(error.error.message, AlertType.Error);
      } else {
        this.alertService.show("Something went wrong", AlertType.Error);
      }
    }
  }
}
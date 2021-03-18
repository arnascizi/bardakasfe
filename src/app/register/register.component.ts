import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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
    private teacherService: TeacherService
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

// @ts-ignore
  get formControls(): any {
    return this.form.controls;
  }
// @ts-ignore
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.teacherService.addNewTeacher(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { relativeTo: this.route });
        },
      });
  }

}
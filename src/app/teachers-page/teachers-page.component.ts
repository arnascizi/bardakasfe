import { TeacherService } from './../services/teacher.service';
import { EMPTY, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../shared/teacher';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
})
export class TeachersPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  teachers$!: Observable<Teacher[]>;
  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.isLoading$ = of(true);
    this.teachers$ = this.teacherService.getAllTeachers().pipe(
      tap((teacher) => {
        this.isLoading$ = of(false);
      }),
      catchError(err => {
        this.isLoading$ = of(false);
        this.teachers$ = of([]);
        return EMPTY;
      })
    );
  }
}

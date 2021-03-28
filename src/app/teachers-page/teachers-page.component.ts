import { TeacherService } from './../services/teacher.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../shared/teacher';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
})
export class TeachersPageComponent implements OnInit {
  teachers$!: Observable<Teacher[]>;
  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teachers$ = this.teacherService.getAllTeachers();
  }
}

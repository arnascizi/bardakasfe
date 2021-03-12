import { TeacherService } from './../services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../shared/teacher';
import { Evaluation } from '../shared/evaluation';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit {
  teachers$!: Observable<Teacher[]>;
  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.teachers$ = this.teacherService.getAllTeachers();
  }
}

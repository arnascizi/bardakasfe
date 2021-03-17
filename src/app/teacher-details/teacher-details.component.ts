import { TeacherService } from './../services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Teacher } from '../shared/teacher';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit{
  teacherId!: Observable<string>;
  teacher$!: Observable<Teacher>;
  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.teacherId = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id') as string));

    this.teacher$ = this.teacher$.pipe(
      switchMap(id => this.teacherService.getTeacherById(Number(id))));
  }

}

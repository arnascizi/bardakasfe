import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherService } from '../services/teacher.service';
import { Evaluation } from '../shared/evaluation';
import { Teacher } from '../shared/teacher';

@Component({
  selector: 'app-teachers-info',
  templateUrl: './teachers-info.component.html',
  styleUrls: ['./teachers-info.component.scss']
})
export class TeachersInfoComponent implements OnInit {
  @Input() teacher!: Teacher;
  evaluations$!: Observable<Evaluation[]>;
  constructor(
    private teacherService: TeacherService
  ) { }
  ngOnInit(): void {
    this.evaluations$ = this.teacherService
      .getTeachersPostedEvaluations(Number(this.teacher.id));
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { EvaluationService } from '../services/evaluation.service';
import { Teacher } from '../shared/teacher';

@Component({
  selector: 'app-teachers-info',
  templateUrl: './teachers-info.component.html',
})
export class TeachersInfoComponent implements OnInit {
  @Input() teacher: Teacher;

  evaluationListCount?: number;

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit(): void {
    this.evaluationService
      .getEvaluationsByTeacherId(this.teacher.id.toString())
      .pipe(
        take(1),
        tap((val) => {
          this.evaluationListCount = val.length;
        })
      )
      .subscribe();
  }
}

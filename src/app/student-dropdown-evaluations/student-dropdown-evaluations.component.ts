import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluationTableItem } from '../shared/evaluation-table-item';
import { Student } from '../shared/student';

@Component({
  selector: 'app-student-dropdown-evaluations',
  templateUrl: './student-dropdown-evaluations.component.html',
  styleUrls: ['./student-dropdown-evaluations.component.scss'],
})
export class StudentDropdownEvaluationsComponent {
  @Input()
  student: Student;

  @Input()
  evaluationItems: EvaluationTableItem[];

  constructor(private router: Router) {}

  onClickRow(evaluationId: number) {
    this.router.navigateByUrl(`evaluation/${evaluationId}`);
  }

  onClickButton() {
    this.router.navigateByUrl(`evaluation/new/${this.student.id}`);
  }
}

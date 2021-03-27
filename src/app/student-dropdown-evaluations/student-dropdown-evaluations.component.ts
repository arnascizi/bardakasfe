import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluationDropdownItem } from '../shared/evaluation-dropdown-item';
import { Student } from '../shared/student';

@Component({
  selector: 'app-student-dropdown-evaluations',
  templateUrl: './student-dropdown-evaluations.component.html',
  styleUrls: ['./student-dropdown-evaluations.component.scss']
})
export class StudentDropdownEvaluationsComponent {

  @Input()
  student: Student;

  @Input()
  evaluationItems: EvaluationDropdownItem[];

  constructor(private router: Router) {}

  onClick(evaluationId: number) {
    this.router.navigateByUrl(`evaluation/${evaluationId}`);
  }

  onCreateClick() {
    this.router.navigateByUrl("evaluation")
  }

}

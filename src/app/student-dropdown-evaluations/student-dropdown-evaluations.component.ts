import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EvaluationTableItem } from '../shared/evaluation-table-item';
import { Student } from '../shared/student';
import { Teacher } from './../shared/teacher';

@Component({
  selector: 'app-student-dropdown-evaluations',
  templateUrl: './student-dropdown-evaluations.component.html',
  styleUrls: ['./student-dropdown-evaluations.component.scss'],
})
export class StudentDropdownEvaluationsComponent implements OnInit {
  @Input()
  student: Student;

  @Input()
  evaluationItems: EvaluationTableItem[];

  currentUser$: Observable<Teacher>;

  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  onClickRow(evaluationId: number) {
    this.router.navigateByUrl(`evaluation/${evaluationId}`);
  }

  onClickButton() {
    this.router.navigateByUrl(`evaluation/new/${this.student.id}`);
  }
}

import { TeacherService } from './../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { EvaluationService } from '../services/evaluation.service';
import { Evaluation } from '../shared/evaluation';
import { StudentService } from '../services/student.service';
import { Person } from '../shared/person';
import { EvaluationTableItem } from '../shared/evaluation-table-item';
import { OveralGradesEnumFunctions } from '../constants/overall-grades.enum';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss'],
})
export class TeacherDetailsComponent implements OnInit {
  evaluations: Evaluation[];

  tableEvaluations: EvaluationTableItem[] = [];

  students: Person[] = [];

  teacher: Person;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    this.getAllStudents();

    this.renderDataTable();
  }

  private getAllStudents(): void {
    this.studentService
      .getAllStudents()
      .pipe(
        take(1),
        tap((val) => {
          val.forEach((student) =>
            this.students.push({
              id: student.id,
              fullName: `${student?.name} ${student?.surname}`,
            })
          );
        })
      )
      .subscribe();
  }

  private renderDataTable(): void {
    this.route.paramMap
      .pipe(
        take(1),
        tap((paramMap) => {
          const id = paramMap.get('id');
          if (id) {
            this.getAllTeacherEvaluations(id);
            this.getTeacher(id);
          }
        })
      )
      .subscribe();
  }

  private getAllTeacherEvaluations(id: string) {
    this.evaluationService
      .getEvaluationsByTeacherId(id)
      .pipe(
        take(1),
        tap((val) => {
          this.evaluations = val;
          this.loadEvaluationTable();
        })
      )
      .subscribe();
  }

  private getTeacher(id: string) {
    this.teacherService
      .getTeacherById(Number(id))
      .pipe(
        take(1),
        tap(
          (value) =>
            (this.teacher = {
              id: value.id,
              fullName: `${value.name} ${value.surname}`,
            })
        )
      )
      .subscribe();
  }

  private loadEvaluationTable(): void {
    this.evaluations.forEach((evaluation) =>
      this.tableEvaluations.push({
        id: evaluation.id,
        stream: evaluation.stream,
        fullName: `${this.students
          .filter((val) => val.id === evaluation.studentId)
          .map((ele) => ele.fullName)}`,
        updatedAt: evaluation.updatedAt || 0,
        overallGrade: OveralGradesEnumFunctions.getOverAllGradeEnumString(
          evaluation.overallEvaluation
        ),
      })
    );
    this.sortEvaluationTableByStudentName();
  }

  private sortEvaluationTableByStudentName(): void {
    this.tableEvaluations.sort((a, b) => (a.fullName > b.fullName ? 1 : -1));
  }

  onClick(evaluationId: number) {
    this.router.navigateByUrl(`/evaluation/${evaluationId}`);
  }
}

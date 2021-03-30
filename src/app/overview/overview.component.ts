import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import {
  OveralGrades,
  OveralGradesEnumFunctions,
} from '../constants/overall-grades.enum';
import { Streams } from '../constants/streams.enum';
import { EvaluationService } from '../services/evaluation.service';
import { StudentService } from '../services/student.service';
import { Evaluation } from '../shared/evaluation';
import { OverviewItem } from '../shared/overview-item';
import { Student } from '../shared/student';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  streams: string[] = Streams.values();
  students: Student[];
  evaluations: Evaluation[];
  overviewItems: OverviewItem[] = [];
  overviewItems$: Observable<OverviewItem[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading$ = of(true)
    forkJoin([
      this.studentService.getAllStudents(),
      this.evaluationService.getAllEvaluations(),
    ])
      .pipe(
        take(1),
        tap((results) => {
          this.students = results[0];
          this.evaluations = results[1];
          this.initOverviewItems();
        })
      )
      .subscribe({
        next: x => this.isLoading$ = of(false),
        error: err => this.isLoading$ = of(false)
      });
  }

  initOverviewItems() {
    if (this.students.length > 0) {
      this.students.forEach((student) => {
        this.overviewItems.push({
          id: student.id,
          fullStudentName: `${student.name} ${student.surname}`,
          beOverallGrade: this.calcEvaluationAverages(
            Streams[Streams.BE],
            student
          ),
          feOverallGrade: this.calcEvaluationAverages(
            Streams[Streams.FE],
            student
          ),
          uxOverallGrade: this.calcEvaluationAverages(
            Streams[Streams.UX],
            student
          ),
          qaOverallGrade: this.calcEvaluationAverages(
            Streams[Streams.FE],
            student
          ),
        });
      });
    }
    this.overviewItems$ = of(this.overviewItems.sort((a, b) => this.gradeToNum(b.beOverallGrade) - this.gradeToNum(a.beOverallGrade)));
  }

  private calcEvaluationAverages(stream: string, student: Student): string {
    let average = 0;
    let count = 0;
    this.evaluations.forEach((evaluation) => {
      if (evaluation.studentId === student.id && evaluation.stream === stream) {
        count++;
        if (
          OveralGradesEnumFunctions.getOverAllGradeEnumString(
            evaluation.overallEvaluation
          ) === OveralGrades.NOT_RECOMMENDED
        )
          average += 1;
        if (
          OveralGradesEnumFunctions.getOverAllGradeEnumString(
            evaluation.overallEvaluation
          ) === OveralGrades.AVERAGE
        )
          average += 2;
        if (
          OveralGradesEnumFunctions.getOverAllGradeEnumString(
            evaluation.overallEvaluation
          ) === OveralGrades.GOOD
        )
          average += 3;
        if (
          OveralGradesEnumFunctions.getOverAllGradeEnumString(
            evaluation.overallEvaluation
          ) === OveralGrades.VERY_GOOD
        )
          average += 4;
      }
    });
    if (count !== 0) {
      if (average / count <= 1) return OveralGrades.NOT_RECOMMENDED;
      if (average / count <= 2) return OveralGrades.AVERAGE;
      if (average / count <= 3) return OveralGrades.GOOD;
      if (average / count <= 4) return OveralGrades.VERY_GOOD;
    }
    return 'Not evaluated';
  }

  goToStudentDropdown(overviewId: number) {
    this.router.navigate([`evaluate`, overviewId]);
  }

  onChange(eventTarget: EventTarget | null): void {
    if (eventTarget == null || this.overviewItems.length < 1) return;

    let target = eventTarget as HTMLSelectElement;

    this.overviewItems$ = of(
      this.overviewItems.sort((a, b) => {
        if (target.value === Streams[Streams.BE]) {
          return (
            this.gradeToNum(b.beOverallGrade) -
            this.gradeToNum(a.beOverallGrade)
          );
        }
        if (target.value === Streams[Streams.FE]) {
          return (
            this.gradeToNum(b.feOverallGrade) -
            this.gradeToNum(a.feOverallGrade)
          );
        }
        if (target.value === Streams[Streams.UX]) {
          return (
            this.gradeToNum(b.uxOverallGrade) -
            this.gradeToNum(a.uxOverallGrade)
          );
        }
        if (target.value === Streams[Streams.QA]) {
          return (
            this.gradeToNum(b.qaOverallGrade) -
            this.gradeToNum(a.qaOverallGrade)
          );
        }
        return 0;
      })
    );
  }

  gradeToNum(grade: string): number {
    if (grade === OveralGrades.VERY_GOOD) return 4;
    if (grade === OveralGrades.GOOD) return 3;
    if (grade === OveralGrades.AVERAGE) return 2;
    if (grade === OveralGrades.NOT_RECOMMENDED) return 1;
    return 0;
  }
}

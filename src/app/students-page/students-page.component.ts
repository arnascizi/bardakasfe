import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { EvaluationService } from '../services/evaluation.service';
import { StudentService } from '../services/student.service';
import { Evaluation } from '../shared/evaluation';
import { Person } from '../shared/person';
import { Student } from '../shared/student';
import { StudentInfoItem } from '../shared/student-info-item';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
})
export class StudentsPageComponent implements OnInit {
  studentInfoItems: StudentInfoItem[];

  private students: Student[];
  private evaluations: Evaluation[];

  private loggedInTeacher: Person;

  constructor(
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService
      .getCurrentUser()
      .pipe(
        take(1),
        tap((teacher) => {
          this.loggedInTeacher = teacher;

          this.studentService
            .getAllStudents()
            .pipe(
              take(1),
              tap((students) => {
                this.students = students;

                this.evaluationService
                  .getAllEvaluations()
                  .pipe(
                    take(1),
                    tap((evaluations) => {
                      this.evaluations = evaluations;

                      this.setupStudentInfoItems();
                    })
                  )
                  .subscribe();
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  private setupStudentInfoItems(): void {
    this.studentInfoItems = [];

    this.students.forEach((student) => {
      const evaluationAmount: number = this.evaluations.filter(
        (e) => e.studentId == student.id
      ).length;

      const evaluationsBE: Evaluation[] = this.getTeacherEvaluationsByStreamAndStudentId(
        'BE',
        student.id
      );
      const evaluationsFE: Evaluation[] = this.getTeacherEvaluationsByStreamAndStudentId(
        'FE',
        student.id
      );
      const evaluationsUX: Evaluation[] = this.getTeacherEvaluationsByStreamAndStudentId(
        'UX',
        student.id
      );
      const evaluationsQA: Evaluation[] = this.getTeacherEvaluationsByStreamAndStudentId(
        'QA',
        student.id
      );

      const evaluationIdBE: string =
        evaluationsBE.length >= 1 ? evaluationsBE[0].id.toString() : '';
      const evaluationIdFE: string =
        evaluationsFE.length >= 1 ? evaluationsFE[0].id.toString() : '';
      const evaluationIdUX: string =
        evaluationsUX.length >= 1 ? evaluationsUX[0].id.toString() : '';
      const evaluationIdQA: string =
        evaluationsQA.length >= 1 ? evaluationsQA[0].id.toString() : '';

      this.studentInfoItems.push({
        id: student.id,
        name: student.name,
        surname: student.surname,
        evaluationAmount: evaluationAmount,
        evaluationIdBE: evaluationIdBE,
        evaluationIdFE: evaluationIdFE,
        evaluationIdUX: evaluationIdUX,
        evaluationIdQA: evaluationIdQA,
      });
    });
  }

  private getTeacherEvaluationsByStreamAndStudentId(
    stream: string,
    studentId: number
  ): Evaluation[] {
    const evaluations: Evaluation[] = this.evaluations.filter(
      (e) =>
        e.teacherId == this.loggedInTeacher.id &&
        e.studentId == studentId &&
        e.stream == stream
    );

    return evaluations;
  }

  onClickButton() {
    this.router.navigateByUrl(`students/add`);
  }
}

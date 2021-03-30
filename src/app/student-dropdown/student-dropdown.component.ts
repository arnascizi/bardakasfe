import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { OveralGradesEnumFunctions } from '../constants/overall-grades.enum';
import { EvaluationService } from '../services/evaluation.service';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { Evaluation } from '../shared/evaluation';
import { EvaluationTableItem } from '../shared/evaluation-table-item';
import { Student } from '../shared/student';
import { Teacher } from '../shared/teacher';

@Component({
  selector: 'app-student-dropdown',
  templateUrl: './student-dropdown.component.html',
})
export class StudentDropdownComponent implements OnInit {
  @Input()
  selectedStudent: Student;
  isLoading$: Observable<boolean>;

  private routeStudentId: string | null;

  students: Student[];
  private teachers: Teacher[];
  private evaluations: Evaluation[];

  evaluationItems: EvaluationTableItem[];

  // Instead of figuring out how to make the <select> have a default value,
  // I just put a default student in the student list, which gets removed when onChange is called.
  private defaultOptionStudent: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = of(true);
    this.routeStudentId = this.route.snapshot.paramMap.get('id');

    this.defaultOptionStudent = {
      id: -1,
      name: 'Choose a',
      surname: 'student',
    };

    this.setupEvaluations();
  }

  onChange(eventTarget: EventTarget | null): void {
    if (eventTarget == null) return;

    const target = eventTarget as HTMLSelectElement;

    if (this.students.length < 1) return;

    this.students = this.students.filter(
      (student) => student.id != -1 // -1 is for the default student option :)
    );

    this.selectedStudent = this.students.filter(
      (student) => student.id == Number(target.value)
    )[0];

    this.setupEvaluationItems();
  }

  private setupDefaultStudent(): void {
    this.studentService
      .getAllStudents()
      .pipe(
        take(1),
        tap((students) => {
          if (students.length >= 1) {
            if (this.routeStudentId == null) {
              students.unshift(this.defaultOptionStudent);
            }

            this.students =
              this.routeStudentId == null
                ? students
                : students.sort((e1, e2) =>
                    e1.id == Number(this.routeStudentId) ? -1 : 1
                  );

            this.selectedStudent =
              this.routeStudentId == null
                ? students[0]
                : students.filter(
                    (s) => s.id == Number(this.routeStudentId)
                  )[0];

            this.setupEvaluationItems();
          }
        })
      )
      .subscribe();
  }

  private setupEvaluationItems(): void {
    this.evaluationItems = [];

    let evals: Evaluation[] = this.evaluations.filter(
      (e) => e.studentId == this.selectedStudent.id
    );

    evals = evals.sort((e1, e2) => (e1.stream > e2.stream ? 1 : -1));

    evals.forEach((evaluation) => {
      this.evaluationItems.push(this.getEvaluationDropdownItem(evaluation));
    });
    this.isLoading$ = of(false);
  }

  private setupEvaluations(): void {
    this.evaluationService
      .getAllEvaluations()
      .pipe(
        take(1),
        tap((evals) => {
          this.evaluations = evals;

          this.setupTeachers();
        })
      )
      .subscribe();
  }

  private setupTeachers(): void {
    this.teacherService
      .getAllTeachers()
      .pipe(
        take(1),
        tap((t) => {
          this.teachers = t;

          this.setupDefaultStudent();
        })
      )
      .subscribe();
  }

  private getEvaluationDropdownItem(
    evaluation: Evaluation
  ): EvaluationTableItem {
    const evaluationId: number = evaluation.id;
    const stream: string = evaluation.stream;
    const fullTeacherName: string = this.getFullTeacherNameById(
      evaluation.teacherId
    );
    const overallGrade: string = OveralGradesEnumFunctions.getOverAllGradeEnumString(
      evaluation.overallEvaluation
    );
    const date: number = evaluation.updatedAt || 0;

    let evaluationItem: EvaluationTableItem = {
      id: evaluationId,
      stream: stream,
      fullName: fullTeacherName,
      updatedAt: date,
      overallGrade: overallGrade,
    };
    return evaluationItem;
  }

  private getFullTeacherNameById(teacherId: number): string {
    const teacher: Teacher | undefined = this.teachers.find(
      (t) => t.id == teacherId
    );

    return `${teacher?.name} ${teacher?.surname}` || '';
  }
}

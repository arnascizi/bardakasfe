import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { OveralGrades } from '../constants/overall-grades.enum';
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
  styleUrls: ['./student-dropdown.component.scss'],
})
export class StudentDropdownComponent implements OnInit {
  @Input()
  selectedStudent: Student;

  defaultId: number;
  students: Student[];
  teachers: Teacher[];
  evaluationItems: EvaluationTableItem[];

  constructor(
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setupTeachers();
    this.route.params.pipe(
      take(1)
    ).subscribe(
      res => this.defaultId = res['id']
    )
    this.setupDefaultStudent();
  }

  onChange(eventTarget: EventTarget | null): void {
    if (eventTarget == null) return;

    const target = eventTarget as HTMLSelectElement;

    if (this.students.length < 1) return;

    this.selectedStudent = this.students.filter(
      (student) => student.id == Number(target.value)
    )[0];

    this.setupEvaluations();
  }

  private setupDefaultStudent(): void {
      this.studentService
      .getAllStudents()
      .pipe(
        take(1),
        tap((students) => {
          if (students.length < 1) return;
          this.students = students;
          this.selectedStudent = students.find(student => student.id == this.defaultId) || students[0];
          this.setupEvaluations();
        })
      )
      .subscribe();

  }

  private setupEvaluations(): void {
    this.evaluationService
      .getEvaluationsByStudentId(this.selectedStudent.id.toString())
      .pipe(
        take(1),
        tap((evals) => {
          this.evaluationItems = [];

          evals = evals.sort((e1, e2) => (e1.stream > e2.stream ? 1 : -1));

          evals.forEach((evaluation) => {
            this.evaluationItems.push(
              this.getEvaluationDropdownItem(evaluation)
            );
          });
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
    const overallGrade: string = evaluation.overallEvaluation || 'No grade';
    const date: number = evaluation.updatedAt || 0;

    const evaluationItem: EvaluationTableItem = {
      id: evaluationId,
      stream: stream,
      fullName: fullTeacherName,
      updatedAt: date,
      overallGrade: OveralGrades.getOverAllGradeEnumString(overallGrade),
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

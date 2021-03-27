import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { EvaluationService } from '../services/evaluation.service';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { Evaluation } from '../shared/evaluation';
import { EvaluationDropdownItem } from '../shared/evaluation-dropdown-item';
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
  evaluationItems: EvaluationDropdownItem[];

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

    let target = eventTarget as HTMLSelectElement;

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
  ): EvaluationDropdownItem {
    let evaluationId: number = evaluation.id;
    let stream: string = evaluation.stream;
    let fullTeacherName: string = this.getFullTeacherNameById(evaluation.teacherId);
    let overallGrade: string = evaluation.overallEvaluation;
    let date: string = this.getFormattedDate(evaluation.updatedAt!);

    if (overallGrade == undefined) overallGrade = 'No grade';

    if (date == undefined) date = 'Missing date';

    let evaluationItem: EvaluationDropdownItem = {
      id: evaluationId,
      stream: stream,
      fullTeacherName: fullTeacherName,
      updatedAt: date,
      overallGrade: overallGrade!,
    };

    return evaluationItem;
  }

  private getFullTeacherNameById(teacherId: number): string {
    let fullTeacherName: string = '';

    let teacher: Teacher | undefined = this.teachers.find((t) => t.id == teacherId);

    fullTeacherName = `${teacher?.name} ${teacher?.surname}`;

    return fullTeacherName;
  }

  private getFormattedDate(date: number): string {
    let parsedDate: Date = new Date(date);

    let month: string = parsedDate.getMonth().toString();
    let day: string = parsedDate.getDay().toString();

    let hours: string = parsedDate.getHours().toString();
    let minutes: string = parsedDate.getMinutes().toString();

    if (month.length == 1) month = `0${month}`;

    if (day.length == 1) day = `0${day}`;

    if (hours.length == 1) hours = `0${hours}`;

    if (minutes.length == 1) minutes = `0${minutes}`;

    let dateString: string = `${parsedDate.getFullYear()}/${month}/${day}`;
    let timeString: string = `${hours}:${minutes}`;

    return `${dateString} ${timeString}`;
  }
}

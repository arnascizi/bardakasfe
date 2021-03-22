import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Grades } from '../constants/grades.enum';
import { OveralGrades } from '../constants/overall-grades.enum';
import { Streams } from '../constants/streams.enum';
import { AuthService } from '../services/auth.service';
import { EvaluationService } from '../services/evaluation.service';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { Evaluation } from '../shared/evaluation';
import { Person } from '../shared/person';
import { Student } from '../shared/student';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss'],
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm: FormGroup;
  gradeSelectionOptions: object;
  overallEvaluationOptions: object;
  isSubmited: boolean;
  isEvaluationFormNew: boolean;
  isEditable: boolean;

  allStreams: string[];
  teacher: Person;
  loggedTeacher: Person;

  students$: Observable<Student[]>;

  maxCharsForText: number = 255;

  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService,
    private studentService: StudentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.students$ = this.studentService.getAllStudents();

    this.getPersons();

    this.initDropdownsValues();

    this.initEvaluationForm();
  }

  private initEvaluationForm(): void {
    this.route.paramMap
      .pipe(
        take(1),
        tap((params: ParamMap) => {
          const id = params.get('id');
          if (id) {
            this.loggedTeacher = this.authService.getCurrentUser();

            this.prefillEditForm(id);
          } else {
            this.isEvaluationFormNew = true;
            this.teacher = this.authService.getCurrentUser();
            this.initForm();
          }
        })
      )
      .subscribe();
  }

  private prefillEditForm(id: string): void {
    this.evaluationService
      .getEvaluationById(id)
      .pipe(
        take(1),
        tap((values: Evaluation) => {
          this.initForm(values);
          this.setTeacher(values.teacherId)
          this.evaluationForm.disable();
        })
      )
      .subscribe();
  }

  private setTeacher(id: number){
    this.teacherService
    .getTeacherById(id)
    .pipe(
      take(1),
      tap((value) => (this.teacher = value))
    )
    .subscribe();
  }

  private initForm(evaluation?: Evaluation): void {
    this.evaluationForm = this.fb.group({
      studentId: [
        evaluation?.studentId || '',
        {
          validators: [Validators.required],
        },
      ],
      teacherId: [evaluation?.teacherId || this.teacher.id],
      stream: [evaluation?.stream || '', { validators: [Validators.required] }],
      teacherComment: [
        evaluation?.teacherComment || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      communication_Grade: [
        evaluation?.communication_Grade || '',
        [Validators.required],
      ],
      communication_comments: [
        evaluation?.communication_comments || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      abilityToLearnSelect: [
        evaluation?.ability_to_learn_grade || '',
        [Validators.required],
      ],
      abilityToLearnComment: [
        evaluation?.communication_comments || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      is_extramile: [evaluation?.is_extramile || '', [Validators.required]],
      is_extramile_comments: [
        evaluation?.is_extramile_comments || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      is_motivated: [evaluation?.is_motivated || '', [Validators.required]],
      motivation_comments: [
        evaluation?.motivation_comments || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      directionComment: [
        evaluation?.directionComment || '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(this.maxCharsForText),
          ],
          updateOn: 'blur',
        },
      ],
      overallEvaluationSelect: [
        evaluation?.overallEvaluationSelect || '',
        {
          validators: [Validators.required],
        },
      ],
      overall_comments: [
        evaluation?.overall_comments || '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(this.maxCharsForText),
          ],
          updateOn: 'blur',
        },
      ],
      id: [evaluation?.id || null],
    });
  }

  private getPersons(): void {
    this.teacher = this.authService.getCurrentUser();
  }

  private initDropdownsValues(): void {
    this.gradeSelectionOptions = Grades;
    this.overallEvaluationOptions = OveralGrades;
    this.allStreams = Streams.values();
  }

  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
    });
  }

  submitForm(): void {
    if (this.evaluationForm.valid) {
      if (this.isEvaluationFormNew) {
        this.addEvaluationForm();
      } else {
        this.updateEditedEvaluationForm();
      }
    } else {
      this.validateAllFormFields(this.evaluationForm);
      window.scroll(0, 0);
    }
  }

  private addEvaluationForm(): void {
    this.isEvaluationFormNew = false;
    this.evaluationService
      .addEvaluation(this.evaluationForm.value)
      .pipe(
        take(1),
        tap(() => (this.isSubmited = true))
      )
      .subscribe();
  }

  private updateEditedEvaluationForm(): void {
    this.evaluationService
      .updateEditedEvaluation(this.evaluationForm.value)
      .pipe(
        take(1),
        tap(() => (this.isSubmited = true))
      )
      .subscribe();
  }

  makeEditable(): void {
    if (!this.isEditable) {
      this.isEditable = true;
      this.evaluationForm.enable();
    } else {
      this.isEditable = false;
      this.evaluationForm.disable();
    }
  }
}

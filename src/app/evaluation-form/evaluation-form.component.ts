import { HttpErrorResponse } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Grades } from '../constants/grades.enum';
import { OveralGrades } from '../constants/overall-grades.enum';
import { Streams } from '../constants/streams.enum';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { EvaluationService } from '../services/evaluation.service';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { AlertType } from '../shared/alert';
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

  allStreams: string[];

  teacher: Person;

  loggedUser: Person;

  students$: Observable<Student[]>;

  maxCharsForText: number = 255;

  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService,
    private studentService: StudentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private alertService: AlertService,
    private toastrService: ToastrService
  ) {}

  orderOriginal = (
    a: KeyValue<string, OveralGrades>,
    b: KeyValue<string, OveralGrades>
  ): number => {
    return 0;
  };

  ngOnInit(): void {
    this.students$ = this.studentService.getAllStudents();

    this.initDropdownsValues();

    this.initEvaluationForm();
  }

  private initEvaluationForm(): void {
    combineLatest([this.route.paramMap, this.authService.getCurrentUser()])
      .pipe(
        map(([router, currentUser]) => {
          const id = router.get('id');
          if (id) {
            this.loggedUser = currentUser;
            this.prefillEditForm(id);
          } else {
            this.teacher = currentUser;
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

          if (values.teacherId === this.loggedUser.id) {
            this.teacher = this.loggedUser;
          } else {
            this.setTeacher(values.teacherId);
          }

          this.evaluationForm.disable();
        })
      )
      .subscribe();
  }

  private setTeacher(id: number) {
    this.teacherService
      .getTeacherById(id)
      .pipe(
        take(1),
        tap(
          (value) =>
            (this.teacher = {
              ...value,
              fullName: `${value.name} ${value.surname}`,
            })
        )
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
      communicationGrade: [
        evaluation?.communicationGrade || '',
        [Validators.required],
      ],
      communicationComment: [
        evaluation?.communicationComment || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      abilityToLearnGrade: [
        evaluation?.abilityToLearnGrade || '',
        [Validators.required],
      ],
      abilityToLearnComments: [
        evaluation?.abilityToLearnComments || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      isExtraMile: [evaluation?.isExtraMile ?? '', [Validators.required]],
      extraMileComments: [
        evaluation?.extraMileComments || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      isMotivated: [evaluation?.isMotivated ?? '', [Validators.required]],
      motivationComments: [
        evaluation?.motivationComments || null,
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      directionComments: [
        evaluation?.directionComments || '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(this.maxCharsForText),
          ],
          updateOn: 'blur',
        },
      ],
      overallEvaluation: [
        evaluation?.overallEvaluation || '',
        {
          validators: [Validators.required],
        },
      ],
      overallComments: [
        evaluation?.overallComments || '',
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
      if (this.loggedUser) {
        this.updateEditedEvaluationForm();
      } else {
        this.addEvaluationForm();
      }
    } else {
      this.validateAllFormFields(this.evaluationForm);
      window.scroll(0, 0);
    }
  }

  private addEvaluationForm(): void {
    this.evaluationService
      .addEvaluation(this.evaluationForm.value)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.toastrService.success('Evaluation updated!', 'Success');
        },
        (err) => {
          this.handleError(err);
        }
      );
  }

  private updateEditedEvaluationForm(): void {
    this.evaluationService
      .updateEditedEvaluation(this.evaluationForm.value)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.toastrService.success('Evaluation updated!', 'Success');
        },
        (err) => {
          this.handleError(err);
        }
      );
  }

  private handleError(error: ErrorEvent | HttpErrorResponse) {
    if (!(error.error instanceof ErrorEvent) && error.error.status === 422) {
      if (error.error.message !== undefined) {
        this.alertService.show(error.error.message, AlertType.Error);
      } else {
        this.alertService.show('Something went wrong', AlertType.Error);
      }
    }
  }
}

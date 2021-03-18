import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Grades } from '../constants/grades.enum';
import { OveralGrades } from '../constants/overall-grades.enum';
import { Streams } from '../constants/streams.enum';
import { AuthService } from '../services/auth.service';
import { EvaluationService } from '../services/evaluation.service';
import { StudentService } from '../services/student.service';
import { Student } from '../shared/student';
import { Teacher } from '../shared/teacher';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss'],
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm: FormGroup;
  gradeSelectionOptions: string[];
  overallEvaluationOptions: string[];
  isSubmited: boolean;
  isInvalid: boolean;

  allStreams: string[];

  students$: Observable<Student[]>;
  teacher: Teacher;

  maxCharsForText: number = 255;

  constructor(
    public fb: FormBuilder,
    public evaluationService: EvaluationService,
    public studentService: StudentService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPersons();

    this.initDropdownsValues();

    this.evaluationForm = this.fb.group({
      studentId: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      teacherId: [this.teacher.id],
      stream: ['', { validators: [Validators.required] }],
      teacherComment: [
        '',
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      communicationSelect: ['', [Validators.required]],
      communicationComment: [
        '',
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      abilityToLearnSelect: ['', [Validators.required]],
      abilityToLearnComment: [
        '',
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      extraMileSelect: ['', [Validators.required]],
      extraMileComment: [
        '',
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      motivationSelect: ['', [Validators.required]],
      motivationComment: [
        '',
        {
          validators: [Validators.maxLength(this.maxCharsForText)],
          updateOn: 'blur',
        },
      ],
      directionComment: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(this.maxCharsForText),
          ],
          updateOn: 'blur',
        },
      ],
      overallEvaluationSelect: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      overallEvaluationComment: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(this.maxCharsForText),
          ],
          updateOn: 'blur',
        },
      ],
    });
  }

  getPersons(): void {
    this.students$ = this.studentService.getAllStudents();
    this.teacher = this.authService.getCurrentUser();
  }

  initDropdownsValues(): void {
    this.gradeSelectionOptions = Grades.values();
    this.overallEvaluationOptions = OveralGrades.values();
    this.allStreams = Streams.values();
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
    });
  }

  submitForm(): void {
    if (this.evaluationForm.valid) {
      this.isInvalid = false;
      this.evaluationService
        .addEvaluation(this.evaluationForm.value)
        .subscribe(() => {
          this.isSubmited = true;
        });
    } else {
      this.isInvalid = true;
      this.validateAllFormFields(this.evaluationForm);
      window.scroll(0, 0);
    }
  }
}

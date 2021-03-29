import { Component, Input } from '@angular/core';
import { StudentInfoItem } from '../shared/student-info-item';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
})

export class StudentsInfoComponent {
  @Input() student: StudentInfoItem;
}
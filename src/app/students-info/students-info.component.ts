import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { StudentService } from '../services/student.service';
import { StudentInfoItem } from '../shared/student-info-item';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.scss']
})

export class StudentsInfoComponent {
  @Input() student: StudentInfoItem;

  constructor(
    private notificationService: NotificationService,
    private studentService: StudentService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  onRemoveClick() {
    this.notificationService.confirmation(`All evaluations for this student will be removed. Including evaluations made by other teachers. Are you sure you want to remove ${this.student.name} ${this.student.surname}?`, "Are you positively sure?", () => {
      this.studentService.deleteStudentById(`${this.student.id}`).pipe(
        take(1)        
      ).subscribe(
        res => {
          this.toastrService.success("Student has been removed!", "Success");
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['students']));
        }
      );
    })
  }
}
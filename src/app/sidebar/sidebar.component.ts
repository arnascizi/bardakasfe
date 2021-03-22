import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../services/student.service';
import { Student } from '../shared/student';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  students$!: Observable<Student[]>;
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.students$ = this.studentService.getAllStudents();
  }

}

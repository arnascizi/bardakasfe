import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../shared/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`/api/students`);
  }

  getStudentById(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`/api/students/${id}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>('/api/students', student);
  }

  deleteStudentById(id: string): Observable<Student> {
    return this.httpClient.delete<Student>(`/api/students/${id}`);
  }
}
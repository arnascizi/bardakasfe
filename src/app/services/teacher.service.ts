import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from './../shared/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private httpClient: HttpClient) {}

  addNewTeacher(teacher: Teacher): Observable<Teacher> {
    return this.httpClient.post<Teacher>(`/api/teachers`, teacher);
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`/api/teachers`);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(`/api/teachers/${id}`);
  }

  updateTeacher(id: number, params: Teacher): Observable<Teacher> {
    return this.httpClient.put<Teacher>(`/api/teachers/${id}`, params);
  }

  deleteTeacher(id: number): Observable<Teacher> {
    return this.httpClient.delete<Teacher>(`/api/teachers/${id}`);
  }
}

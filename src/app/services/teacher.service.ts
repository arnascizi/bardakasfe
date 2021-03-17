import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from '../shared/evaluation';
import { Teacher } from './../shared/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private HttpClient: HttpClient) { }

  addNewTeacher(teacher: Teacher): Observable<Teacher> {
    return this.HttpClient.post<Teacher>(`/api/teachers`, teacher);
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.HttpClient.get<Teacher[]>(`/api/teachers`);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.HttpClient.get<Teacher>(`/api/teachers/${id}`);
  }

  updateTeacher(id: number, params: Teacher): Observable<Teacher> {
    return this.HttpClient.put<Teacher>(`/api/teachers/${id}`, params);
  }

  deleteTeacher(id: number): Observable<Teacher> {
    return this.HttpClient.delete<Teacher>(`/api/teachers/${id}`);
  }

  getTeachersPostedEvaluations(id: number): Observable<Evaluation[]> {
    return this.HttpClient.get<Evaluation[]>(`/api/evaluations?teacherId=${id}`);
  }
}


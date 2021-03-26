import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evaluation } from '../shared/evaluation';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  constructor(private httpClient: HttpClient) {}

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`/api/evaluations`);
  }

  getTeacherEvaluationsStream(stream: string): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(
      `/api/evaluations?stream=${stream}`
    );
  }

  getEvaluationById(id: string): Observable<Evaluation> {
    return this.httpClient.get<Evaluation>(`api/evaluations/${id}`);
  }

  getEvaluationsByStudentId(studentId: string): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(
      `/api/evaluations/student/${studentId}`
    );
  }

  addEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.httpClient.post<Evaluation>('/api/evaluations', evaluation);
  }

  updateEditedEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>('/api/evaluations', evaluation);
  }

  getEvaluationsByTeacherId(id: string): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`/api/evaluations/teacher/${id}`);
  }
}

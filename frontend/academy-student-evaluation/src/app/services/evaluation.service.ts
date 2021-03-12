import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../shared/teacher';
import { Evaluation } from '../shared/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private httpClient: HttpClient) { }

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`/api/evaluations`);
  }

  getTeacherEvaluationsStream(stream: string): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`/api/evaluations?stream=${stream}`)
  }
}

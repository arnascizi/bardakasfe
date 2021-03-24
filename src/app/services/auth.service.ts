import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Teacher } from '../shared/teacher';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //TODO: remove testTeacher after auth implementation
  getCurrentUser(): Observable<Teacher> {
    const testTeacher: Teacher = {
      id: 456846,
      name: 'Marcia',
      surname: 'David',
      username: 'David89',
      password: '6048d820b9693e2936a907d2',
      fullName: 'Marcia Davi'
    };
    return of(testTeacher);
  }
}

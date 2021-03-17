import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../shared/teacher';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //TODO: remove testTeacher after auth implementation
  testTeacher: Teacher = {
    id: 456846,
    name: 'Marcia',
    surname: 'David',
    username: 'David89',
    password: '6048d820b9693e2936a907d2',
  };

  private authTeacher: BehaviorSubject<Teacher> = new BehaviorSubject(
    this.testTeacher
  );

  getCurrentUser(): Teacher {
    return { ...this.authTeacher.value };
  }
}

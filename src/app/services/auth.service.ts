import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Teacher } from '../shared/teacher';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<Teacher>;
  user: Observable<Teacher>;
  isLogedIn: boolean;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<Teacher>(JSON.parse(localStorage.getItem('currentUser')!));
    this.user = this.userSubject.asObservable()
  }

  get userValue(): Teacher {
    return this.userSubject.value;
  }

  isAuthenticated(): Promise<boolean> {
    const promise = new Promise<boolean>((
      resolve => {
        resolve(localStorage.getItem('isLoggedIn') === 'true');
      }
    ));
    return promise;
  }

  getCurrentUser(): Observable<Teacher> {
    return this.userSubject.asObservable();
  }

  login(username: string, password: string): Observable<Teacher> {
    return this.httpClient.post<Teacher>(`/api/teachers/login`, { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        this.isLogedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        return user;
      }));
  }

  register(teacher: Teacher): Observable<Teacher> {
    this.isLogedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    return this.httpClient.post<Teacher>(`/api/teachers`, teacher);
  }

  logout(): void {
    this.isLogedIn = false;
    localStorage.removeItem('currentUser');
    this.userSubject.next(null!);
    this.router.navigate([`/login`]);
    localStorage.removeItem('isLoggedIn');
  }
}

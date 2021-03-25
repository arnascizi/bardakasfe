import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Teacher } from '../shared/teacher';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  visible: boolean;
  user$: Observable<Teacher>;

  constructor(private router: Router,
    private authService: AuthService) {
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === "/login" || this.router.url === "/register") {
            this.visible = false;
          } else {
            this.visible = true;
          }
        }
      }
    );
    this.user$ = this.authService.getCurrentUser();
  }

  onLogout(): void {
    this.authService.logout();
  }
}

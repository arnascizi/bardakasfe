import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Alert, AlertType } from '../shared/alert';
import { AlertService } from '../services/alert.service';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
  @Input()
  alert: Alert;
  alertClass: string;
  alertShown: boolean;
  alertShownSubscription: Subscription;
  routerSubscription: Subscription;

  constructor(private alertService: AlertService, private router: Router) {
  }

  ngOnInit() { 
    this.alertShownSubscription = this.alertService.onAlert().subscribe(alert=>{
      this.alert = alert;
      this.alertClass = this.cssClass(this.alert);
      this.alertShown = alert.visible;
    });

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          this.alertShown = false;
      }
  });
  }

  ngOnDestroy() {
    this.alertShown = false;
    this.alertShownSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  private cssClass(alert: Alert) {

    switch (alert.type) {
      case AlertType.Success:
        return 'alert-success';
      case AlertType.Error:
        return 'alert-danger';
      case AlertType.Info:
        return 'alert-info';
      case AlertType.Warning:
        return 'alert-warning';
      default:
        return ''
    }
  }
}
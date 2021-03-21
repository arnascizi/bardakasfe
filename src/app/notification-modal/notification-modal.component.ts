import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Notification, NotificationType } from '../shared/notification';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html'
})
export class NotificationModalComponent implements OnInit {

  @Input()
  public notification!: Notification;
  public headerClass!: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.headerClass = this.cssClass(this.notification);
  }

  cssClass(notification: Notification) {
    switch (notification.type) {
      case NotificationType.Success:
        return 'bg-success text-white';
      case NotificationType.Error:
        return 'bg-danger text-white';
      case NotificationType.Confirm:
        return 'bg-warning';
      default:
        return '';
    }
  }

  confirmedBack() {
    this.activeModal.close();
  }

}

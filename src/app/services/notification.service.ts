import { Injectable } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { NotificationType } from '../shared/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private modalService: NgbModal) { }

  success(message: string, title: string) {
    const modalRef = this.modalService.open(NotificationModalComponent, { centered: true });
    modalRef.componentInstance.notification = ({
      title: title,
      message: message,
      type: NotificationType.Success,
      showCancelButton: true,
      cancelButtonName: 'Close',
      showConfirmButton: false
    })
  }

  error(message: string, title: string) {
    const modalRef = this.modalService.open(NotificationModalComponent, { centered: true });
    modalRef.componentInstance.notification = ({
      title: title,
      message: message,
      type: NotificationType.Error,
      showCancelButton: true,
      cancelButtonName: 'Close',
      showConfirmButton: false
    })
  }

  confirmation(message: string, title: string, doIfConfirmed: () => any) {
    const modalRef = this.modalService.open(NotificationModalComponent, { centered: true });
    modalRef.componentInstance.notification = ({
      title: title,
      message: message,
      type: NotificationType.Confirm,
      showCancelButton: true,
      cancelButtonName: 'Cancel',
      showConfirmButton: true,
      confirmButtonName: 'Confirm'
    })
    modalRef.result.then((confirmed) => {
      if (confirmed) {
        doIfConfirmed();
      }
    })
  }
}
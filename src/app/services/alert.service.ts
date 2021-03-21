import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../shared/alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private alertSubject = new Subject<Alert>();
    alertShown = new EventEmitter<Alert>();
    alertHidden = new EventEmitter<void>();
    constructor() { }

    onAlert(): Observable<Alert> {
      return this.alertSubject.asObservable();
    }

    show(message: string, type: AlertType) {
      this.alertSubject.next({message: message, type: type, visible:true})
    }

    close() {
      this.alertSubject.next({message: undefined, type: undefined, visible:false})
     }
}
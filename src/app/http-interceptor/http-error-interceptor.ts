import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError((error: any) => {
          let errorMsg = '';
          if (!(error.error instanceof ErrorEvent) && error.error.status == 500) {
            if (error.error.message !== undefined) {
              errorMsg = error.error.message;
            } else {
              errorMsg = "Something went wrong :/";
            }
            this.notificationService.error(errorMsg);
          }
          return throwError(error);
        })
      )
  }
}
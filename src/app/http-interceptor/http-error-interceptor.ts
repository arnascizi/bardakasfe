import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, throwError } from "rxjs";
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
        catchError((error: ErrorEvent | HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error.status !== 422) {
            if (error.error.message !== undefined) {
              errorMsg = error.error.message;
            } else {
              errorMsg = "Something went wrong, please try again later.";
            }
            this.notificationService.error(errorMsg, "Uh oh!");
          }
          return EMPTY;
        })
      )
  }
}
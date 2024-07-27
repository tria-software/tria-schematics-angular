import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthenticationService } from "../pages/login/service/authentication-service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status === 401) {
              this.authenticationService.logout();

              location.reload();
              return;
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            this.authenticationService.logout();

            location.reload();
            return;
          }
        },
      })
    );
  }
}

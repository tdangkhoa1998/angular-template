import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import {
  catchError,
  filter,
  take,
  switchMap,
  finalize,
  takeUntil,
} from 'rxjs/operators';
import { Meta } from "@angular/platform-browser";
import { CredentialsService } from '@shared/services/credentials.service';
import { HttpCancelService } from '@shared/services/http-cancel.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private meta: Meta,
    public http: HttpClient,
    private router: Router,
    private httpCancelService: HttpCancelService,
    public credentialsService: CredentialsService,
    // private notificationService: NotificationService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const viewport = this.meta.getTag("name=API");
    // var cloneRequest = environment.production ? request?.clone({
    //   headers: request.headers,
    //   url: request.url.replace(
    //     "http://14.161.47.48:45200",
    //     viewport?.content
    //   )
    // }) : request;
    var cloneRequest = request;
    // const accessExpired = this.credentialsService.isAccessTokenExpired();

    // if (accessExpired == false) {
    //   cloneRequest = this.addToken(cloneRequest);
    // }
    cloneRequest = this.addToken(cloneRequest);

    return next.handle(cloneRequest).pipe(
      takeUntil(this.httpCancelService.onCancelPendingRequests()),
      catchError((err: HttpErrorResponse) => {
        // Forbidden move to login
        if (err.status === 401) {
          return this.handleRenewToken(cloneRequest, next);
        } else if ((err.status === 403) || (err.status === 9999)) {
          this.credentialsService.logout().subscribe((res) => {
            this.router.navigate(['/login']);
          });
        }
        //  else if ((err.status != 200) && (err.error instanceof ArrayBuffer)) {
        //   var decodedString = String.fromCharCode.apply(null, new Uint8Array(err?.error));
        //   var obj = JSON.parse(decodedString);
        //   return throwError(obj);
        // }
        // const error = err.error || err.message;
        return throwError(err);
      })
    );
  }

  private handleRenewToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      //Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);
      return this.credentialsService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.data.accessToken);
          return next.handle(this.addToken(request));
        }),
        catchError((e) => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          this.credentialsService.logout().subscribe((res) => {
            return this.router.navigate(['/login']);
          });
          return throwError(e);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request));
        })
      );
    }
  }

  private addToken(request: HttpRequest<any>) {
    let token: string = this.credentialsService.getToken() as string;
    if (token) {
      //Handle boundary in multipart/form-data POST
      if (request.body instanceof FormData) {
        //We are sending a file here
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            undefined: 'multipart/form-data',
          },
        });
      } else {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
      }
    }
    //Return request without token
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
}

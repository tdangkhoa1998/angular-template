import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@app/config/constants/api.constants';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  onSendEmail(email: string) {
    return this.http.post(API.URL.ACCOUNTS.FORGOT_PASSWORD + email, null).pipe(take(1));
  }
}

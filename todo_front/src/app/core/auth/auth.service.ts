import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // api url
  url = environment.apiUrl;
  private error = new Subject();
  isAuth = true;
  userId;

  constructor(private _http: HttpClient, private router: Router) {}

  getError() {
    return this.error.asObservable();
  }

  // submit login form
  submitLogin(value): void {
    this._http
      .post(`${this.url}auth/login`, value, {
        withCredentials: true,
      })
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.error.next(err.error.message);
        },
      );
  }

  // submit singup form
  submitRegister(value): void {
    this._http.post(`${this.url}auth/signup`, value).subscribe(() => {
      this.router.navigate(['/auth/signin']);
    });
  }

  // authenticated check for Guard routes
  isAuthenticated(): any {
    return this._http
      .get(`${this.url}auth/isAuthenticated`, { withCredentials: true })
      .pipe(
        tap(() => {
          return;
        }),
        map((result) => {
          return Boolean(result);
        }),
      );
  }
}

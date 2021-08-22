import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  // api url
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.isAuthenticated = auth;
    });
  }

  // log out of the app
  logout(): void {
    this.http
      .post(`${this.url}auth/logout`, {}, { withCredentials: true })
      .subscribe(() => (this.isAuthenticated = false));
  }
}

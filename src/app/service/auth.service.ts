import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(){
    // return this.http.get('/api/auth').subscribe(() => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  check(): Observable<any> {
    console.log('chech logged in')
    const response = this.http.get('/api/auth');
    response.subscribe(() => this.isLoggedIn = true);
    return response;
  }
}

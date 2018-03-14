import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username, password){
    const response = this.http.post('/api/login', {}, {params: {username, password}});    
    response.subscribe(() => {
      this.isLoggedIn = true;
      this.router.navigate([this.redirectUrl || '/dashboard']);
      this.redirectUrl = null;
    });
    return response;
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

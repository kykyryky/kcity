import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() { 
    this.authService.check().subscribe(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigate([this.authService.redirectUrl || '/dashboard']);
        this.authService.redirectUrl = null;
      }
    });
  }
}
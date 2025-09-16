import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Login } from '../login';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  log: Login[];
  err: boolean;
  constructor(private router: Router, private authService: AuthService) {
    this.log = [];
    this.err = false;
  }
  ngOnInit() {
    this.authService.logout();
  }
  onSubmit(reg: Login, valid: boolean | null) {
    this.authService.login(reg.username, reg.password).subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/messages']);
      } else {
        this.err = true;
      }
    });
  }
}

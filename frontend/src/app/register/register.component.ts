import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Login } from '../login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  reg: Login[];
  err: boolean;
  constructor(private router: Router, private authService: AuthService) {
    this.reg = [];
    this.err = false;
  }
  ngOnInit() {
    this.authService.logout();
  }
  onSubmit(reg: Login, valid: boolean | null) {
    this.authService
      .register(reg.username, reg.password)
      .subscribe((result) => {
        if (result === true) {
          this.router.navigate(['/messages']);
        } else {
          this.err = true;
        }
      });
  }
}

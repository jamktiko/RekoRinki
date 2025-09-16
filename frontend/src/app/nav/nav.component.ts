import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnDestroy {
  login: boolean;
  subscription: Subscription;
  constructor(private authservice: AuthService) {
    this.subscription = this.authservice.loginTrue().subscribe((message) => {
      this.login = message;
    });
    const token = sessionStorage.getItem('accesstoken');
    if (token) {
      this.login = true;
    } else {
      this.login = false;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  doLogout() {
    this.login = false;
  }
}

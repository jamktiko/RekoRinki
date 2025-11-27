import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // jos käytössä
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hide = true; // jos haluat myöhemmin silmäikonin tms.

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      sahkoposti: ['', [Validators.required, Validators.email]],
      salasana: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          // vähintään yksi iso kirjain ja yksi erikoismerkki
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
        ]
      ]
    });
  }

  // helpot getterit templateen
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { sahkoposti, salasana } = this.loginForm.value;
    console.log('Kirjaudu sisään:', sahkoposti, salasana);

    // TODO: kutsu backendin login-APIa
    // esim. authService.login(email, password).subscribe(...)

    // demo: lopetetaan lataus
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}

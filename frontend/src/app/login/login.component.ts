import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // jos käytössä
})
export class LoginComponent {
  // loginForm: FormGroup;
  // loading = false;
  // hide = true; // jos haluat myöhemmin silmäikonin tms.

  // constructor(private fb: FormBuilder) {
  //   this.loginForm = this.fb.group({
  //     sahkoposti: ['', [Validators.required, Validators.email]],
  //     salasana: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(6),
  //         // vähintään yksi iso kirjain ja yksi erikoismerkki
  //         Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
  //       ]
  //     ]
  //   });
  // }

  // // helpot getterit templateen
  // get emailControl() {
  //   return this.loginForm.get('email');
  // }

  // get passwordControl() {
  //   return this.loginForm.get('password');
  // }

  // onSubmit() {
  //   if (this.loginForm.invalid) {
  //     this.loginForm.markAllAsTouched();
  //     return;
  //   }

  //   this.loading = true;

  //   const { sahkoposti, salasana } = this.loginForm.value;
  //   console.log('Kirjaudu sisään:', sahkoposti, salasana);

  //   // TODO: kutsu backendin login-APIa
  //   // esim. authService.login(email, password).subscribe(...)

  //   // demo: lopetetaan lataus
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 1000);
  // }

  // injektoidaan FormBuilder modernilla inject()-menetelmällä
  private fb = inject(FormBuilder);
  // private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  // luodaan lomake turvallisesti fb:n avulla
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required, // kenttä ei saa olla tyhjä
        Validators.minLength(6), // vähintään 6 merkkiä
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*?]).{6,}$/), // salasana sisältää vähintään yhden ison kirjaimen ja yhden erikoismerkin
      ],
    ],
  });

  hide = true; // salasanan näyttö/ piilotus
  loading = false; // lataustila napille

  // Lähetystapahtuma
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Kirjautumistiedot:', email, password);

      // Simuloidaan onnistunutta kirjautumista
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        alert('Kirjautuminen onnistui!');

        this.loginForm.reset(); // tyhjentää arvot
        Object.keys(this.loginForm.controls).forEach((key) => {
          const control = this.loginForm.get(key);
          control?.setErrors(null); // poistaa mahdolliset virheet
          control?.markAsPristine(); // kertoo, ettei käyttäjä ole vielä muokannut mitään
          control?.markAsUntouched(); // kertoo, ettei käyttäjä ole vielä “käynyt” kentissä
        });
      }, 1500);
    } else {
      console.log('Lomake ei ole kelvollinen');
      this.loginForm.markAllAsTouched();
    }
  }

  // apumetodit templateä varten (lyhyempi kirjoitus)
  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
}

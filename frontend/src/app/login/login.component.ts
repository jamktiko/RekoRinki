import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // jos käytössä
})
export class LoginComponent {
  // injektoidaan FormBuilder modernilla inject()-menetelmällä
  private fb = inject(FormBuilder);

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  // luodaan lomake turvallisesti fb:n avulla
  loginForm = this.fb.group({
    // sähköposti ei saa olla tyhjälsku, On oltava oikean muotoinen sähköposti
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

  // Kun käyttäjä painan kirjaudu sisään nappi suoritaan tämä funktio
  onSubmit(): void {
    // Jos lomake on virheellinen, näytetään virheet ja palataan
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Jos lomake on kunnossa, näytetään spinneri
    this.loading = true;

    const { email, password } = this.loginForm.value;
    console.log('Kirjautumistiedot:', email, password);

    // Simuloidaan 1.5 sek API kutsu. kun kirjautuminen on valmis:
    setTimeout(() => {
      // piilotetaan spinneri
      this.loading = false;

      // Tyhjennetään lomake
      this.loginForm.reset();

      // Nollataan virheet
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.setErrors(null);
        control?.markAsPristine();
        control?.markAsUntouched();
      });

      // 👉 Nyt navigointi profiili-sivulle
      this.router.navigate(['/profiili']);

      // Näytetään pieni ilmoitus snackBarilla
      this.snackBar.open('Kirjautuminen onnistui!', 'OK', { duration: 2000 });
    }, 1500);
  }

  // kaksi funktiota ovat apufunktioita, jotka vain palauttavat sähköpostin ja salasanan lomakekentät.
  // Niitä käytetään HTML:ssä, jotta virheiden tarkistaminen olisi helppoa ja koodi pysyy siistinä.
  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
}

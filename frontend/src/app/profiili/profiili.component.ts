import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { Router } from 'express';
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-profiili',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './profiili.component.html',
  styleUrl: './profiili.component.css',
})
export class ProfiiliComponent {
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

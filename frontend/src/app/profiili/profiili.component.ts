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
import { Router } from 'express';
import { CommonModule } from '@angular/common';

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
    password: ['', Validators.required],
  });

  hide = true; // salasanan näyttö/ piilotus
  loading = false; // lataustila napille

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     console.log('Kirjautumistiedot:', email, password);
  //     // Tyhjennetään kentät onnistuneen kirjautumisen jälkeen
  //     this.loginForm.reset();
  //     // tänne voit myöhemmin lisätä API-kutsun tai reitityksen
  //   } else {
  //     console.log('Lomake ei ole kelvollinen');
  //     this.loginForm.markAllAsTouched();
  //   }
  // }

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

        // Tyhjennä lomake ilman virheväriä
        this.loginForm.reset();
        // this.loginForm.markAsPristine();
        // this.loginForm.markAsUntouched();
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

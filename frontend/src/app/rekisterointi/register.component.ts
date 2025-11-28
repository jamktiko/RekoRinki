import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rekisterointi-lomake',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  hide = true; // if you later add password visibility toggle

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        // *** names match formControlName in HTML ***

        isBusiness: [false],

        etunimi: ['', Validators.required],
        sukunimi: ['', Validators.required],

        email: ['', [Validators.required, Validators.email]],

        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ['', Validators.required],

        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9+\s-]{6,20}$/),
          ],
        ],

        street: ['', Validators.required],

        postalCode: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{5}$/),
          ],
        ],

        city: ['', Validators.required],

        terms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  // *** error key matches HTML: hasError('passwordMismatch') ***
  passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('passwordConfirm')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    const payload = this.registerForm.value;
    console.log('Rekisteröintidata', payload);

    this.successMessage = 'Rekisteröinti onnistui! Voit nyt kirjautua sisään.';
    this.registerForm.reset();
    this.submitted = false;
  }
}


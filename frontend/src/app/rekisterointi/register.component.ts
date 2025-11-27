import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,        // <-- *ngIf, *ngFor jne.
    ReactiveFormsModule  // <-- [formGroup], formControlName jne.
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9+\s-]{6,20}$/),
          ],
        ],
        streetAddress: ['', Validators.required],
        postalCode: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{5}$/),
          ],
        ],
        city: ['', Validators.required],
        termsAccepted: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsNotMatching: true };
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

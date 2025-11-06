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

@Component({
  selector: 'app-profiili',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './profiili.component.html',
  styleUrl: './profiili.component.css',
})
export class ProfiiliComponent {
  hide = true;

  // injektoidaan FormBuilder modernilla inject()-menetelmällä
  private fb = inject(FormBuilder);

  // luodaan lomake turvallisesti fb:n avulla
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Kirjautumistiedot:', email, password);
      // tänne voit myöhemmin lisätä API-kutsun tai reitityksen
    } else {
      console.log('Lomake ei ole kelvollinen');
      this.loginForm.markAllAsTouched();
    }
  }
}

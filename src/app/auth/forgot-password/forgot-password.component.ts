import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email = '';
  msg = '';
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Método que envía una solicitud de recuperación de contraseña por email.
   */
  onSubmit() {
    this.auth.forgotPassword(this.email).subscribe({
      next: () => {
        this.msg = 'Te hemos enviado un correo con la nueva contraseña.';
      },
      error: err => {
        this.msg =  'No encontramos ese correo.';
      }
    });
  }

  /**
   * Método que redirige a la página de login.
   */
  goToLogIn(): void {
    this.router.navigate(['/auth/login']);
  }
}


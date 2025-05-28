import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],

})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método que navega a la página de registro.
   */
  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  /**
   * Método que navega a la página de recuperación de contraseña.
   */
  goToForgot(): void {
    this.router.navigate(['/forgot-password']);
  }

  /**
   * Método que procesa el login limpiando el storage y navegando al home.
   */
  onLogin(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: err => {
        this.errorMessage = "Credenciales inválidas, intente de nuevo.";
        console.error("Error en login", err);
      }
    });
  }
}

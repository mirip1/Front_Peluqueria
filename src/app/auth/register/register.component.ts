import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = { nombre: '', apellidos: '', email: '', telefono: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        this.errorMessage = "Error en el registro. Verifica los datos.";
        console.error("Error en registro", err);
      }
    });
  }
}

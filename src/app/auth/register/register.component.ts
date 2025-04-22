import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    acepto: false
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(form: any): void {
    if (!form.valid) return;

    const payload = {
      nombre: this.user.nombre,
      apellidos: this.user.apellidos,
      email: this.user.email,
      telefono: this.user.telefono,
      password: this.user.password
    };

    this.authService.register(payload).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: err => {
        this.errorMessage = 'El numero de telefono o el correo electrónico ya esta registrado.';
      }
    });
  }
  goToLogIn(): void {
    this.router.navigate(['/auth/login']);
  }
}

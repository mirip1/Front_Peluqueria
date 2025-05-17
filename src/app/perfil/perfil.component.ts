import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { UsuarioDTO } from '../shared/models/usuariodto.model';
import { UsuarioService } from '../shared/services/usuario.service';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user!: UsuarioDTO;

  oldPass = '';
  newPass = '';
  confirmPass = '';      // ← campo para confirmar
  emailForm = '';
  telefonoForm = '';

  msgError   = '';
  msgSuccess = '';

  @ViewChild('emailNg')    emailNg!: NgModel;
  @ViewChild('telefonoNg') telefonoNg!: NgModel;
  @ViewChild('oldPassNg')  oldPassNg!: NgModel;
  @ViewChild('newPassNg')  newPassNg!: NgModel;
  @ViewChild('confirmNg')  confirmNg!: NgModel;

  constructor(
    private userService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(u => {
      this.user = u;
      this.emailForm    = u.email;
      this.telefonoForm = u.telefono;
    });
  }

  clearMessages() {
    this.msgError   = '';
    this.msgSuccess = '';
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

  onChangePassword() {
    this.clearMessages();

    if (this.oldPassNg.invalid || this.newPassNg.invalid || this.confirmNg.invalid) {
      return;
    }
    if (this.newPass !== this.confirmPass) {
      this.msgError = 'Las contraseñas nuevas no coinciden.';
      return;
    }

    this.userService.changePassword(this.oldPass, this.newPass).subscribe({
      next: () => this.msgSuccess = 'Contraseña actualizada correctamente.',
      error: e => this.msgError = e.error || 'Error actualizando contraseña.'
    });
  }

  onChangeEmail() {
    this.clearMessages();
    if (this.emailNg.invalid) return;
    this.userService.changeEmail(this.emailForm).subscribe({
      next: () => {
        alert('Email cambiado. Por favor, inicia sesión de nuevo.');
        this.onLogout();
      },
      error: e => this.msgError = e.error || 'Error actualizando email'
    });
  }

  onChangeTelefono() {
    this.clearMessages();
    if (this.telefonoNg.invalid) return;
    this.userService.changeTelefono(this.telefonoForm).subscribe({
      next: () => this.msgSuccess = 'Teléfono actualizado correctamente.',
      error: e => this.msgError = e.error || 'Error actualizando teléfono'
    });
  }

  onDeleteAccount() {
    this.clearMessages();
    if (!confirm('¿Eliminar cuenta?')) return;
    this.userService.deleteAccount().subscribe({
      next: () => {
        this.userService.logout();
        this.router.navigate(['/auth/register']);
      },
      error: () => this.msgError = 'No se pudo eliminar la cuenta'
    });
  }
}

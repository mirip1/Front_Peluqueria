import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Constant } from '../constant/constant';
import { ChangeEmailResponse, UsuarioDTO } from '../models/usuariodto.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${Constant.apiUrl}/api/usuarios`;


  constructor(private http: HttpClient, private auth: AuthService) { }

  // Método que obtiene el perfil del usuario autenticado
  getProfile(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/profile`);
  }

  // Método que cambia la contraseña del usuario
  changePassword(oldPass: string, newPass: string): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/password`,
      { oldPassword: oldPass, newPassword: newPass }
    );
  }

  // Método que cambia el correo electrónico del usuario y actualiza el token
  changeEmail(newEmail: string): Observable<ChangeEmailResponse> {
    return this.http.put<ChangeEmailResponse>(
      `${this.apiUrl}/email`,
      { newEmail }
    ).pipe(tap(resp => {
      localStorage.setItem('token', resp.token);
    }));
  }

  // Método que elimina la cuenta del usuario
  deleteAccount(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  // Método que cierra la sesión del usuario
  logout() {
    this.auth.logout();
  }

  // Método que cambia el teléfono del usuario
  changeTelefono(newTel: string): Observable<void> {
    const url = `${this.apiUrl}/telefono`;
    return this.http.put<void>(
      url,
      newTel,
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }

}

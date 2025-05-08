import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Constant } from '../constant/constant';
import { ChangeEmailResponse, UsuarioDTO } from '../models/usuariodto.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${Constant.apiUrl}/api/usuarios`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getProfile(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/profile`);
  }
  changePassword(oldPass: string, newPass: string): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/password`,
      { oldPassword: oldPass, newPassword: newPass }
    );
  }

  changeEmail(newEmail: string): Observable<ChangeEmailResponse> {
    return this.http.put<ChangeEmailResponse>(
      `${this.apiUrl}/email`,
      { newEmail }
    ).pipe(tap(resp => {
      localStorage.setItem('token', resp.token);
    }));
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  logout() {
    this.auth.logout();
  }
  changeTelefono(newTel: string): Observable<void> {
    const url = `${this.apiUrl}/telefono`;
    return this.http.put<void>(
      url,
      newTel,
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }
}

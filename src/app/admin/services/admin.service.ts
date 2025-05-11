import { Injectable } from '@angular/core';
import { Constant } from '../../shared/constant/constant';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../../shared/models/usuariodto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private apiUrl = `${Constant.apiUrl}/api/admin/usuarios`;

  constructor(private http: HttpClient) {}

  listUsers(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrl);
  }

  banUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/ban`, {});
  }

  unbanUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/unban`, {});
  }
}

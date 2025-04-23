import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../constant/constant';
import { UsuarioDTO } from '../models/usuariodto.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${Constant.apiUrl}/api/usuarios`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/profile`);
  }
}

import { Injectable } from '@angular/core';
import { Constant } from '../../shared/constant/constant';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../../shared/models/usuariodto.model';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../../shared/models/servicio.model';
import { Cita } from '../../shared/models/cita.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private apiUrlAdminUsuarios = `${Constant.apiUrl}/api/admin/usuarios`;
  private apiUrlServicios = `${Constant.apiUrl}/api/servicios`;
  private apiUrlCitas = `${Constant.apiUrl}/api/citas`;


  constructor(private http: HttpClient) { }

  listUsers(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrlAdminUsuarios);
  }

  banUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlAdminUsuarios}/${id}/ban`, {});
  }

  unbanUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlAdminUsuarios}/${id}/unban`, {});
  }
  listServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrlServicios);
  }

  addServicio(dto: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrlServicios, dto);
  }

  updateServicio(id: number, dto: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrlServicios}/${id}`, dto);
  }

  deleteServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlServicios}/${id}`);
  }
  listCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrlCitas}`);
  }
  cancelCita(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlCitas}/${id}`, null);
  }
}

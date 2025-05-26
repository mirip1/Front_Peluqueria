import { Injectable } from '@angular/core';
import { Constant } from '../../shared/constant/constant';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../../shared/models/usuariodto.model';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../../shared/models/servicio.model';
import { Cita } from '../../shared/models/cita.model';
import { DisponibilidadDiaDTO, HorarioDTO } from '../../shared/models/horariodto.model';
import { Peluqueria } from '../../shared/models/peluqueria.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private apiUrlAdminUsuarios = `${Constant.apiUrl}/api/admin/usuarios`;
  private apiUrlServicios = `${Constant.apiUrl}/api/servicios`;
  private apiUrlCitas = `${Constant.apiUrl}/api/citas`;
  private apiUrlHorario = `${Constant.apiUrl}/api/horarios`;
  private apiPeluqueria = `${Constant.apiUrl}/api/peluqueria`;



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
  getMesDisponibilidad(year: number, month: number): Observable<DisponibilidadDiaDTO[]> {
    return this.http.get<DisponibilidadDiaDTO[]>(
      `${this.apiUrlHorario}/mes/${year}/${month}`
    );
  }
  getHorarioBase(): Observable<HorarioDTO[]> {
    return this.http.get<HorarioDTO[]>(`${this.apiUrlHorario}/base`);
  }
  updateHorarioBase(id: number, dto: HorarioDTO): Observable<HorarioDTO> {
    return this.http.put<HorarioDTO>(`${this.apiUrlHorario}/${id}`, dto);
  }
  addExcepcion(dto: HorarioDTO, fecha: string): Observable<HorarioDTO> {
    return this.http.post<HorarioDTO>(
      `${this.apiUrlHorario}/excepcion?fecha=${fecha}`, dto
    );
  }
  createHorarioBase(dto: HorarioDTO): Observable<HorarioDTO> {
    return this.http.post<HorarioDTO>(`${this.apiUrlHorario}/base`, dto);
  }
  deleteHorarioBase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlHorario}/base/${id}`);
  }
  deleteExcepcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlHorario}/excepcion/${id}`);
  }
  getPeluqueria(): Observable<Peluqueria> {
    return this.http.get<Peluqueria>(this.apiPeluqueria);
  }

  updatePeluqueria(dto: Peluqueria): Observable<Peluqueria> {
    return this.http.put<Peluqueria>(this.apiPeluqueria, dto);
  }
}

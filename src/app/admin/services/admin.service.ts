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

  /**
   * Método que obtiene la lista de usuarios con rol cliente.
   */
  listUsers(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrlAdminUsuarios);
  }

  /**
   * Método que deshabilita (ban) a un usuario por su id.
   */
  banUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlAdminUsuarios}/${id}/ban`, {});
  }

  /**
   * Método que habilita (unban) a un usuario por su id.
   */
  unbanUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlAdminUsuarios}/${id}/unban`, {});
  }

  /**
   * Método que obtiene todos los servicios disponibles.
   */
  listServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrlServicios);
  }

  /**
   * Método que crea un nuevo servicio.
   */
  addServicio(dto: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrlServicios, dto);
  }

  /**
   * Método que actualiza un servicio existente.
   */
  updateServicio(id: number, dto: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrlServicios}/${id}`, dto);
  }

  /**
   * Método que elimina un servicio por su id.
   */
  deleteServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlServicios}/${id}`);
  }

  /**
   * Método que obtiene todas las citas.
   */
  listCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrlCitas}`);
  }

  /**
   * Método que cancela una cita por su id.
   */
  cancelCita(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlCitas}/${id}`, null);
  }

  /**
   * Método que obtiene la disponibilidad mensual de franjas.
   */
  getMesDisponibilidad(year: number, month: number): Observable<DisponibilidadDiaDTO[]> {
    return this.http.get<DisponibilidadDiaDTO[]>(
      `${this.apiUrlHorario}/mes/${year}/${month}`
    );
  }

  /**
   * Método que obtiene el horario base semanal.
   */
  getHorarioBase(): Observable<HorarioDTO[]> {
    return this.http.get<HorarioDTO[]>(`${this.apiUrlHorario}/base`);
  }

  /**
   * Método que actualiza un intervalo base por su id.
   */
  updateHorarioBase(id: number, dto: HorarioDTO): Observable<HorarioDTO> {
    return this.http.put<HorarioDTO>(`${this.apiUrlHorario}/${id}`, dto);
  }

  /**
   * Método que añade una excepción para una fecha dada.
   */
  addExcepcion(dto: HorarioDTO, fecha: string): Observable<HorarioDTO> {
    return this.http.post<HorarioDTO>(
      `${this.apiUrlHorario}/excepcion?fecha=${fecha}`, dto
    );
  }

  /**
   * Método que crea un nuevo intervalo base.
   */
  createHorarioBase(dto: HorarioDTO): Observable<HorarioDTO> {
    return this.http.post<HorarioDTO>(`${this.apiUrlHorario}/base`, dto);
  }

  /**
   * Método que elimina un intervalo base por su id.
   */
  deleteHorarioBase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlHorario}/base/${id}`);
  }

  /**
   * Método que elimina una excepción por su id.
   */
  deleteExcepcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlHorario}/excepcion/${id}`);
  }

  /**
   * Método que obtiene los datos de la peluquería.
   */
  getPeluqueria(): Observable<Peluqueria> {
    return this.http.get<Peluqueria>(this.apiPeluqueria);
  }

  /**
   * Método que actualiza los datos de la peluquería.
   */
  updatePeluqueria(dto: Peluqueria): Observable<Peluqueria> {
    return this.http.put<Peluqueria>(this.apiPeluqueria, dto);
  }
}

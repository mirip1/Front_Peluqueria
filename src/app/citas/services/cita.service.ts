import { Injectable } from '@angular/core';
import { Constant } from '../../shared/constant/constant';
import { HttpClient } from '@angular/common/http';
import { Cita } from '../../shared/models/cita.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = `${Constant.apiUrl}/api/citas`;

  constructor(private http: HttpClient) { }

  /**
   * Método que crea una nueva cita.
   */
  crearCita(cita: { usuarioId: number; fechaYHora: string; }): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  /**
   * Método que cancela una cita existente por su id.
   */
  cancelarCita(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, null);
  }

  /**
   * Método que obtiene todas las citas de un usuario.
   */
  obtenerCitasPorUsuario(usuarioId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  /**
   * Método que elimina una cita por su id.
   */
  deleteCita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../../shared/constant/constant';
import { DisponibilidadDiaDTO, HorarioDTO } from '../../shared/models/horariodto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrlH = `${Constant.apiUrl}/api/citas`;
  private apiUrlD = `${Constant.apiUrl}/api/horarios/mes/`;

  constructor(private http: HttpClient) { }

  /**
   * Método que obtiene los horarios de un día específico.
   */
  getHorariosPorFecha(fecha: string): Observable<HorarioDTO[]> {
    return this.http.get<HorarioDTO[]>(`${this.apiUrlH}/fecha/${fecha}`);
  }

  /**
   * Método que obtiene la disponibilidad de un mes completo.
   */
  getMesDisponibilidad(year: number, month: number): Observable<DisponibilidadDiaDTO[]> {
    return this.http.get<DisponibilidadDiaDTO[]>(
      `${this.apiUrlD}${year}/${month}`
    );
  }
}

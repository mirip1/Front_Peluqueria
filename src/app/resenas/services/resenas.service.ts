import { Injectable } from '@angular/core';
import { Constant } from '../../shared/constant/constant';
import { HttpClient } from '@angular/common/http';
import { Resena } from '../../shared/models/resena.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {
  private apiUrl = `${Constant.apiUrl}/api/resenas`;

  constructor(private http: HttpClient) {}

  /** Método que obtiene todas las reseñas. */
  getAll(): Observable<Resena[]> {
    return this.http.get<Resena[]>(this.apiUrl);
  }

  /** Método que añade una nueva reseña. */
  add(resena: Partial<Resena>): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrl, resena);
  }

  /** Método que elimina una reseña por su id. */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

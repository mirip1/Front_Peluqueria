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

  getAll(): Observable<Resena[]> {
    return this.http.get<Resena[]>(this.apiUrl);
  }

  add(resena: Partial<Resena>): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrl, resena);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

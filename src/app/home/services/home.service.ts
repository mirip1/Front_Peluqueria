import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Peluqueria } from '../../shared/models/peluqueria.model';
import { Observable } from 'rxjs';
import { Constant } from '../../shared/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = Constant.apiUrl;
  private apiUrl = this.baseUrl + '/api/peluqueria';

  constructor(private http: HttpClient) {}

  /** Método que obtiene los datos básicos de la peluquería. */
  getPeluqueria(): Observable<Peluqueria> {
    return this.http.get<Peluqueria>(this.apiUrl);
  }
}

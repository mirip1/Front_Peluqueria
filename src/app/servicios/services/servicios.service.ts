import { Injectable } from '@angular/core';
import { Constant } from '../../shared/constant/constant';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../../shared/models/servicio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private baseUrl = Constant.apiUrl;
  private apiUrl = this.baseUrl + '/api/servicios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }
}

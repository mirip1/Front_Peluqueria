import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Constant } from '../../shared/constant/constant';
import { UsuarioDTO } from '../../shared/models/usuariodto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = Constant.apiUrl;
  private apiUrl = this.baseUrl + '/api/usuarios';
  private currentUserSubject = new BehaviorSubject<UsuarioDTO | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<void> {
    return this.http.post<{ token: string }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap(response => {
          localStorage.setItem('authToken', response.token);
        }),
        map((): void => undefined)
      );
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  loadProfile(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/profile`).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }
  get currentUser(): Observable<UsuarioDTO | null> {
    return this.currentUserSubject.asObservable();
  }

forgotPassword(email: string): Observable<void> {
  return this.http.post<void>(
    `${Constant.apiUrl}/api/usuarios/forgot-password`,
    null,
    { params: { email } }
  );
}



  init(): void {
    const token = this.getToken();
    if (token) {
      this.loadProfile().subscribe({ error: () => this.logout() });
    }
  }
}

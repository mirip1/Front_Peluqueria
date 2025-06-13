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

  /**
   * Método que envía las credenciales y guarda el token en localStorage.
   */
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

  /**
   * Método que pilla el token actual del usuario.
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Método que envía los datos de un nuevo usuario y lo crea
   */
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  /**
   * Método que elimina el token y notifica el logout.
   */
  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  /**
   * Método que carga el perfil y actualiza el sujeto currentUser.
   */
  loadProfile(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/profile`).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }
  get currentUser(): Observable<UsuarioDTO | null> {
    return this.currentUserSubject.asObservable();
  }

  /**
   * Método que devuelve true si hay token en localStorage y no está expirado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return true;
  }

  /**
   * Método que se encarga de la logica al olvidar la contraseña de un usuario
   */
  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(
      `${Constant.apiUrl}/api/usuarios/forgot-password`,
      null,
      { params: { email } }
    );
  }


  /**
   * Método que inicia el servicio: si hay token intenta cargar perfil.
   */
  init(): void {
    const token = this.getToken();
    if (token) {
      this.loadProfile().subscribe({ error: () => this.logout() });
    }
  }
}

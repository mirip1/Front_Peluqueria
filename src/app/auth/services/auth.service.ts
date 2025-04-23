import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Constant } from '../../shared/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = Constant.apiUrl;
  private apiUrl = this.baseUrl + '/api/usuarios';
  private currentUserSubject = new BehaviorSubject<string | null>(null);

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

  get currentUser(): Observable<string | null> {
    return this.currentUserSubject.asObservable();
  }
}

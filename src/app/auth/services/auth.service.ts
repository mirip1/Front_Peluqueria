import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constant } from '../../shared/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = Constant.apiUrl;
  private apiUrl = this.baseUrl + '/api/usuarios';
  private currentUserSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            this.currentUserSubject.next(credentials.email);
          }
        })
      );
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

import { CanActivate, Router, UrlTree} from '@angular/router';
import { Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private jwtHelper = new JwtHelperService();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot
  ): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean|UrlTree {
    const token = this.auth.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return this.router.createUrlTree(['/auth/login']);
    }

    const requiredRoles = route.data['roles'] as Array<string> | undefined;
    if (requiredRoles && requiredRoles.length) {
      const payload: any = this.jwtHelper.decodeToken(token);
      const userRole = payload['rol'] || null;
      if (!requiredRoles.includes(userRole)) {
        return this.router.createUrlTree(['/forbidden']);
      }
    }

    return true;
  }

}

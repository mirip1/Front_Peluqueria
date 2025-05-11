import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(public auth: AuthService, private router: Router) {}
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }



}

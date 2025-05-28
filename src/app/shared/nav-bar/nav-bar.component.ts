import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { HomeService } from '../../home/services/home.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule, RouterModule, NgIf, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  constructor(public auth: AuthService, private router: Router, private service: HomeService) {}
  titulo = "";

  // Método que inicializa el componente y establece el título desde la peluquería
  ngOnInit(): void {
    this.service.getPeluqueria().subscribe(p=>{
      this.titulo = p.nombre;
    });

  }

  // Método que comprueba si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }



}

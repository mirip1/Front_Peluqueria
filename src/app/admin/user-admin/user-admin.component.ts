import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from '../../shared/models/usuariodto.model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-user-admin',
  imports: [CommonModule, NavBarComponent],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent implements OnInit {
  usuarios: UsuarioDTO[] = [];
  loading = false;
  error = '';
  sortColumn: string = '';
  sortAsc = true;

  constructor(private adminService: AdminService) {}

  /**
   * Método que se ejecuta al inicializar el componente y dispara la carga de usuarios.
   */
  ngOnInit() {
    this.fetch();
  }

  /**
   * Método que obtiene la lista de usuarios y actualiza el estado de carga.
   */
  fetch() {
    this.loading = true;
    this.adminService.listUsers().subscribe({
      next: list => {
        this.usuarios = list;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar usuarios';
        this.loading = false;
      }
    });
  }

  /**
   * Método que alterna el estado baneado de un usuario solicitando confirmación.
   */
  toggleBan(u: UsuarioDTO) {
    const action = u.baneado ? 'desban' : 'ban';
    if (!confirm(`¿Seguro que deseas ${action}ear a ${u.email}?`)) return;
    (u.baneado
      ? this.adminService.unbanUser(u.id!)
      : this.adminService.banUser(u.id!))
    .subscribe({
      next: () => this.fetch(),
      error: () => alert('Falló la operación')
    });
  }

  /**
   * Método que ordena la tabla de usuarios por la columna indicada.
   */
  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = col;
      this.sortAsc = true;
    }

    this.usuarios.sort((a, b) => {
      let valA: any, valB: any;

      switch (col) {
        case 'id':
          valA = a.id; valB = b.id; break;
        case 'email':
          valA = a.email.toLowerCase();
          valB = b.email.toLowerCase(); break;
        case 'nombre':
          valA = (a.nombre + ' ' + a.apellidos).toLowerCase();
          valB = (b.nombre + ' ' + b.apellidos).toLowerCase(); break;
        case 'telefono':
          valA = a.telefono; valB = b.telefono; break;
        case 'fecha':
          valA = new Date(a.fecha);
          valB = new Date(b.fecha); break;
        default:
          return 0;
      }

      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ?  1 : -1;
      return 0;
    });
  }

  /**
   * Método que retorna el indicador de orden actual para la columna.
   */
  isSorted(col: string): '↑' | '↓' | '' {
    if (this.sortColumn !== col) return '';
    return this.sortAsc ? '↑' : '↓';
  }
}


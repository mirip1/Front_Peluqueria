import { Component, OnInit } from '@angular/core';
import { Cita } from '../../shared/models/cita.model';
import { AdminService } from '../services/admin.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas-admin',
  imports: [NavBarComponent, FormsModule, CommonModule],
  templateUrl: './citas-admin.component.html',
  styleUrl: './citas-admin.component.css'
})
export class CitasAdminComponent implements OnInit {
  citas: Cita[] = [];
  filterEmail = '';
  filterEstado = '';
  sortColumn: string = '';
  sortAsc = true;

  constructor(private adminService: AdminService) { }

  /**
   * Método que se ejecuta al inicializar y carga la lista de citas.
   */
  ngOnInit() {
    this.fetchCitas();
  }

  /**
   * Método que obtiene todas las citas del servicio.
   */
  fetchCitas() {
    this.adminService.listCitas().subscribe(list => this.citas = list);
  }
  get displayedCitas(): Cita[] {
    let arr = this.citas.filter(c =>
      (!this.filterEmail || c.usuarioEmail.toLowerCase().includes(this.filterEmail.toLowerCase()))
      && (!this.filterEstado || c.estado === this.filterEstado)
    );
    if (this.sortColumn) {
      arr = [...arr].sort((a, b) => {
        let valA: any, valB: any;
        switch (this.sortColumn) {
          case 'id':
            valA = a.id; valB = b.id; break;
          case 'usuarioEmail':
            valA = a.usuarioEmail.toLowerCase();
            valB = b.usuarioEmail.toLowerCase(); break;
          case 'fechaYHora':
            valA = new Date(a.fechaYHora);
            valB = new Date(b.fechaYHora); break;
          case 'estado':
            valA = a.estado; valB = b.estado; break;
          default:
            return 0;
        }
        if (valA < valB) return this.sortAsc ? -1 : 1;
        if (valA > valB) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }
    return arr;
  }

  /**
   * Método que cancela una cita seleccionada.
   */
  cancelarCita(id: number) {
    if (!confirm('¿Cancelar esta cita?')) return;
    this.adminService.cancelCita(id).subscribe(() => this.fetchCitas());
  }

  /**
   * Método que ordena las citas por la columna indicada.
   */
  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = col;
      this.sortAsc = true;
    }
    this.citas.sort((a, b) => {
      let valA: any, valB: any;
      switch (col) {
        case 'id':
          valA = a.id; valB = b.id; break;
        case 'usuarioEmail':
          valA = a.usuarioEmail.toLowerCase();
          valB = b.usuarioEmail.toLowerCase(); break;
        case 'fechaYHora':
          valA = new Date(a.fechaYHora);
          valB = new Date(b.fechaYHora); break;
        case 'estado':
          valA = a.estado; valB = b.estado; break;
        default:
          return 0;
      }

      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  /**
   * Método que indica el símbolo de orden actual para la columna.
   */
  isSorted(col: string): '↑' | '↓' | '' {
    if (this.sortColumn !== col) return '';
    return this.sortAsc ? '↑' : '↓';
  }
}

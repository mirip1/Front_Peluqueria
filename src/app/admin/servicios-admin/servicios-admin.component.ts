import { Component, NgModule, OnInit } from '@angular/core';
import { Servicio } from '../../shared/models/servicio.model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-servicios-admin',
  imports: [CommonModule, NavBarComponent, FormsModule],
  templateUrl: './servicios-admin.component.html',
  styleUrl: './servicios-admin.component.css'
})
export class ServiciosAdminComponent implements OnInit {
  servicios: Servicio[] = [];
  nuevoServicio: Servicio = { nombre: '', precio: 0 };
  editServicio: Servicio | null = null;
  error = '';

  constructor(private adminService: AdminService) {}

  /**
   * Método que inicializa la carga de servicios.
   */
  ngOnInit() {
    this.cargarServicios();
  }

  /**
   * Método que obtiene la lista de servicios.
   */
  cargarServicios() {
    this.adminService.listServicios().subscribe({
      next: data => this.servicios = data,
      error: () => this.error = 'Error cargando servicios'
    });
  }

  /**
   * Método que crea un nuevo servicio.
   */
  crear() {
    this.adminService.addServicio(this.nuevoServicio).subscribe({
      next: () => {
        this.cargarServicios();
        this.nuevoServicio = {nombre: '', precio: 0 };
      },
      error: () => alert('No se pudo crear')
    });
  }

  /**
   * Método que prepara la edición de un servicio.
   */
  editar(s: Servicio) {
    this.editServicio = { ...s };
  }

  /**
   * Método que guarda los cambios de un servicio editado.
   */
  guardar() {
    if (!this.editServicio?.id) return;
    this.adminService.updateServicio(this.editServicio.id, this.editServicio).subscribe({
      next: () => {
        this.cargarServicios();
        this.editServicio = null;
      },
      error: () => alert('No se pudo actualizar')
    });
  }

  /**
   * Método que elimina un servicio existente.
   */
  eliminar(id: number) {
    if (!confirm('¿Eliminar servicio?')) return;
    this.adminService.deleteServicio(id).subscribe({
      next: () => this.cargarServicios(),
      error: () => alert('No se pudo borrar')
    });
  }
}

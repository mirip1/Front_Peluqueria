import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from '../../../shared/models/usuariodto.model';
import { Cita } from '../../../shared/models/cita.model';
import { CitaService } from '../../services/cita.service';
import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-historial-citas',
  imports: [CommonModule],
  templateUrl: './historial-citas.component.html',
  styleUrl: './historial-citas.component.css'
})
export class HistorialCitasComponent implements OnInit {
  citas: Cita[] = [];
  currentUser: UsuarioDTO | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private citaService: CitaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getProfile().subscribe({
      next: u => {
        this.currentUser = u;
        this.loadCitas();
      },
      error: () => this.error = 'No se pudo obtener perfil'
    });
  }

  loadCitas() {
    if (!this.currentUser) return;
    this.loading = true;
    this.citaService.obtenerCitasPorUsuario(this.currentUser.id)
      .subscribe({
        next: list => {
          this.citas = list;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error cargando tus citas';
          this.loading = false;
        }
      });
  }

  onDelete(cita: Cita) {
    if (!confirm('¿Borrar esta cita?')) return;
    this.citaService.deleteCita(cita.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => alert('No se pudo borrar la cita')
    });
  }
}

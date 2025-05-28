import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Resena } from '../../../shared/models/resena.model';
import { ResenasService } from '../../services/resenas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { UsuarioDTO } from '../../../shared/models/usuariodto.model';

@Component({
  selector: 'app-resenas-list',
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './resenas-list.component.html',
  styleUrl: './resenas-list.component.css'
})
export class ResenasListComponent implements OnInit {
  resenas: Resena[] = [];
  nueva: Partial<Resena> = { comentario: '', puntuacion: 5 };
  currentUser: UsuarioDTO | null = null;
  canAdd = true;

  constructor(
    private service: ResenasService,
    private usuarioService: UsuarioService,
  ) {}

  sortMode: 'date' | 'scoreAsc' | 'scoreDesc' = 'date';

  /** Método que se ejecuta al inicializar el componente: carga perfil y reseñas. */
  ngOnInit(): void {
    this.usuarioService.getProfile().subscribe(user => {
      this.currentUser = user;
      this.loadResenas();
    });
  }

  /** Método que carga todas las reseñas y decide si se puede añadir una nueva. */
  loadResenas() {
    this.service.getAll().subscribe(list => {
      this.resenas = list;
      this.canAdd = !list.some(r => r.usuarioId === this.currentUser?.id);
    });
  }

  /** Método que envía la nueva reseña si está permitido. */
  enviar() {
    if (!this.canAdd) return;
    this.service.add(this.nueva).subscribe({
      next: () => {
        this.nueva = { comentario: '', puntuacion: 5 };
        this.loadResenas();
      }
    });
  }

  /** Método que borra una reseña dado su id. */
  borrar(id: number) {
    this.service.delete(id).subscribe({
      next: () => this.loadResenas(),
      error: err => console.error(err)
    });
  }

  /** Método que devuelve las reseñas ordenadas según el modo actual. */
  get sortedResenas(): Resena[] {
    const arr = [...this.resenas];

    if (this.sortMode === 'scoreDesc') {
      arr.sort((a, b) => a.puntuacion - b.puntuacion);
    } else if (this.sortMode === 'scoreAsc') {
      arr.sort((a, b) => b.puntuacion - a.puntuacion);
    } else {
      arr.sort((a, b) =>
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    }

    return arr;
  }
}

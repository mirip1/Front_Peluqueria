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
    private svc: ResenasService,
    private usuarioSvc: UsuarioService,
  ) {}

  sortMode: 'date' | 'scoreAsc' | 'scoreDesc' = 'date';

  ngOnInit(): void {
    this.usuarioSvc.getProfile().subscribe(user => {
      this.currentUser = user;
      this.loadResenas();
    });
  }

  loadResenas() {
    this.svc.getAll().subscribe(list => {
      this.resenas = list;
      this.canAdd = !list.some(r => r.usuarioId === this.currentUser?.id);
    });
  }

  enviar() {
    if (!this.canAdd) return;
    this.svc.add(this.nueva).subscribe({
      next: () => {
        this.nueva = { comentario: '', puntuacion: 5 };
        this.loadResenas();
      }
    });
  }

  borrar(id: number) {
    this.svc.delete(id).subscribe({
      next: () => this.loadResenas(),
      error: err => console.error(err)
    });
  }
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

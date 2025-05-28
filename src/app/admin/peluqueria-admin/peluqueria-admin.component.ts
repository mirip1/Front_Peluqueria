import { Component, OnInit } from '@angular/core';
import { Peluqueria } from '../../shared/models/peluqueria.model';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-peluqueria-admin',
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './peluqueria-admin.component.html',
  styleUrl: './peluqueria-admin.component.css'
})
export class PeluqueriaAdminComponent implements OnInit {
  dto: Peluqueria = { id:0, nombre:'', descripcion:'', ubicacion:'' };
  msg = '';

  constructor(private adminService: AdminService, private router: Router){}

  /**
   * Método que carga los datos actuales de la peluquería.
   */
  ngOnInit(){
    this.adminService.getPeluqueria().subscribe(p=>{
      this.dto = p;
    });
  }

  /**
   * Método que envía los cambios de la peluquería al servidor.
   */
  onSubmit(){
    this.msg = '';
    this.adminService.updatePeluqueria(this.dto).subscribe({
      next: p=> this.msg = 'Datos guardados.',
      error: e=> this.msg = 'Error al guardar'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisponibilidadDiaDTO, HorarioDTO } from '../../shared/models/horariodto.model';
import { AdminService } from '../services/admin.service';
import { HorarioExcepcionComponent } from './horario-excepcion/horario-excepcion.component';

@Component({
  selector: 'app-horario-admin',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FormsModule, HorarioExcepcionComponent],
  templateUrl: './horario-admin.component.html',
  styleUrls: ['./horario-admin.component.css']
})
export class HorarioAdminComponent implements OnInit {
  diasSemana = ['LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO','DOMINGO'];

  horarioBase: HorarioDTO[] = [];
  showNew = false;

  newInterval: Partial<HorarioDTO> = {
    diaSemana: 'LUNES',
    horaInicio: '08:00',
    horaFin: '14:30',
    estado: 'DISPONIBLE'
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadBase();
  }

  loadBase() {
    this.adminService.getHorarioBase().subscribe(list => this.horarioBase = list);
  }

  crearBase() {
    const dto: HorarioDTO = {
      id: 0,
      diaSemana: this.newInterval.diaSemana!,
      horaInicio: this.newInterval.horaInicio!,
      horaFin: this.newInterval.horaFin!,
      estado: 'DISPONIBLE'
    };
    this.adminService.createHorarioBase(dto).subscribe(() => {
      this.showNew = false;
      this.loadBase();
    });
  }

  borrarBase(id: number) {
    if (!confirm('¿Eliminar este intervalo?')) return;
    this.adminService.deleteHorarioBase(id).subscribe(() => this.loadBase());
  }
}

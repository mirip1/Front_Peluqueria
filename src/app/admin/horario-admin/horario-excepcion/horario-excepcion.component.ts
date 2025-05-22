// src/app/admin/horario-excepcion/horario-excepcion.component.ts
import { Component, OnInit } from '@angular/core';
import { DisponibilidadDiaDTO, HorarioDTO } from '../../../shared/models/horariodto.model';
import { HorarioService } from '../../../citas/services/horario.service';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horario-excepcion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario-excepcion.component.html',
  styleUrls: ['./horario-excepcion.component.css']
})
export class HorarioExcepcionComponent implements OnInit {
  viewDate = new Date();
  monthDays: (Date | null)[] = [];
  monthDisponibilidad: DisponibilidadDiaDTO[] = [];

  showModal = false;
  showNew = false;
  selectedDate!: Date;
  selectedIntervals: HorarioDTO[] = [];

  get exceptionIntervals(): HorarioDTO[] {
    return this.selectedIntervals.filter(i => i.isException);
  }

  newException: Partial<HorarioDTO> = {
    horaInicio: '',
    horaFin: '',
    estado: 'DISPONIBLE'
  };

  constructor(
    private horarioService: HorarioService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.loadMonth();
  }

  loadMonth() {
    const y = this.viewDate.getFullYear(),
      m = this.viewDate.getMonth() + 1;
    this.horarioService.getMesDisponibilidad(y, m)
      .subscribe(av => {
        this.monthDisponibilidad = av;
        this.generateCalendar();
      });
  }

  prevMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.loadMonth();
  }
  nextMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.loadMonth();
  }

  generateCalendar() {
    this.monthDays = [];
    const first = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    for (let i = 0; i < offset; i++) this.monthDays.push(null);
    const days = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= days; d++) {
      this.monthDays.push(new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), d));
    }
  }

  onDayClick(d: Date | null) {
    if (!d) return;
    this.selectedDate = d;
    const iso = this.formatLocalDate(d);
    const dia = this.monthDisponibilidad.find(x => x.fecha === iso);

    const base = dia?.franjas
      .map(h => ({ ...h, isException: false })) ?? [];

      const exc = dia?.excepciones
      ?.map(h => ({ ...h, isException: true }))
      ?? [];
    this.selectedIntervals = exc.length > 0
      ? exc
      : base;

    this.showNew = false;
    this.showModal = true;
  }


  closeModal() {
    this.showModal = this.showNew = false;
  }

  createException() {
    const dto: HorarioDTO = {
      id: 0,
      diaSemana: this.getDiaSemana(this.selectedDate),
      horaInicio: this.newException.horaInicio!,
      horaFin: this.newException.horaFin!,
      estado: this.newException.estado!
    };
    const fechaStr = this.formatLocalDate(this.selectedDate);
    this.adminService.addExcepcion(dto, fechaStr)
      .subscribe(() => this.onDayClick(this.selectedDate));
  }

  deleteException(id: number) {
    this.adminService.deleteExcepcion(id)
      .subscribe(() => this.onDayClick(this.selectedDate));
  }

  private formatLocalDate(d: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  private getDiaSemana(d: Date): string {
    const dow = d.getDay();
    switch (dow) {
      case 1: return 'LUNES';
      case 2: return 'MARTES';
      case 3: return 'MIERCOLES';
      case 4: return 'JUEVES';
      case 5: return 'VIERNES';
      case 6: return 'SABADO';
      case 0: return 'DOMINGO';
      default: return '';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { DisponibilidadDiaDTO, HorarioDTO, Segmento } from '../../../shared/models/horariodto.model';
import { HorarioService } from '../../services/horario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'angular-calendar';
import { UsuarioDTO } from '../../../shared/models/usuariodto.model';
import { Cita } from '../../../shared/models/cita.model';
import { CitaService } from '../../services/cita.service';
import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, CalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})

export class CalendarComponent implements OnInit {
  viewDate = new Date();
  monthAvailability: DisponibilidadDiaDTO[] = [];
  monthDays: (Date | null)[] = [];
  selectedDayFranja: HorarioDTO[] = [];
  showModal = false;
  selectedDayDate: Date | null = null;
  selectedDaySegments: Segmento[] = [];
  selectedSegment: Segmento | null = null;
  showConfirmModal = false;



  currentUser: UsuarioDTO | null = null;
  myCitas: Cita[] = [];

  constructor(
    private horService: HorarioService,
    private citaService: CitaService,
    private usrService: UsuarioService
  ) {}

  ngOnInit() {
    this.usrService.getProfile().subscribe(u => {
      this.currentUser = u;
      this.loadMisCitas();
      this.loadMonth();
    });
  }

  private formatLocalDate(d: Date): string {
    const pad = (n: number) => n.toString().padStart(2,'0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }
  private loadMisCitas() {
    if (!this.currentUser) return;
    this.citaService.obtenerCitasPorUsuario(this.currentUser.id)
      .subscribe(c => this.myCitas = c);
  }

  loadMonth() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth() + 1;
    this.horService.getMesDisponibilidad(year, month)
      .subscribe(av => {
        this.monthAvailability = av;
        this.generateCalendar();
      });
  }

  generateCalendar() {
    this.monthDays = [];
    const firstOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    const weekday = (firstOfMonth.getDay() + 6) % 7;
    for (let i = 0; i < weekday; i++) this.monthDays.push(null);
    const daysInMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth()+1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      this.monthDays.push(new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), d));
    }
  }

  hasDisponible(d: Date|null): boolean {
    if (!d) return false;
    const iso = this.formatLocalDate(d);
    const dia = this.monthAvailability.find(x => x.fecha === iso);
    return dia?.franjas.some(f => f.estado === 'DISPONIBLE') ?? false;
  }

  hasOcupado(d: Date|null): boolean {
    if (!d) return false;
    const iso = this.formatLocalDate(d);
    return this.myCitas.some(c =>
      c.estado === 'ACTIVA' &&
      c.fechaYHora.slice(0,10) === iso
    );
  }

  prevMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth()-1, 1);
    this.loadMonth();
    this.loadMisCitas();
  }
  nextMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth()+1, 1);
    this.loadMonth();
    this.loadMisCitas();
  }
  onDayClick(d: Date|null) {
    if (!d) return;
    this.selectedDayDate = d;
    const iso = this.formatLocalDate(d);
    this.selectedDayFranja = this.monthAvailability.find(x => x.fecha === iso)?.franjas ?? [];
    this.selectedDaySegments = this.buildSegments(this.selectedDayFranja);
    this.showModal = true;
  }

  private buildSegments(franjas: HorarioDTO[]): Segmento[] {
    const segments: Segmento[] = [];
    const fechaIso = this.selectedDayDate
      ? this.formatLocalDate(this.selectedDayDate)
      : '';

    for (const slot of franjas) {
      const [h0, m0] = slot.horaInicio.split(':').map(Number);
      const [h1, m1] = slot.horaFin   .split(':').map(Number);

      let t = h0 * 60 + m0;
      const end = h1 * 60 + m1;

      while (t < end) {
        const startH = Math.floor(t / 60);
        const startM = t % 60;
        const next   = t + 30;
        const endH   = Math.floor(next / 60);
        const endM   = next % 60;

        const fmt = (x: number) => x.toString().padStart(2,'0');
        const startTime = `${fmt(startH)}:${fmt(startM)}`;
        const endTime   = `${fmt(endH)}:${fmt(endM)}`;

        let estado = slot.estado;

        if (
          estado === 'DISPONIBLE' &&
          this.myCitas.some(c =>
            c.estado === 'ACTIVA' &&
            c.fechaYHora === `${fechaIso}T${startTime}:00`
          )
        ) {
          estado = 'NO_DISPONIBLE';
        }

        segments.push({ startTime, endTime, estado });
        t = next;
      }
    }

    return segments;
  }


  closeModal() {
    this.showModal = false;
    this.selectedDayDate = null;
    this.selectedDaySegments = [];
  }

  onSegmentClick(seg: Segmento) {
    if (seg.estado !== 'DISPONIBLE' || this.isPastSegment(seg)) {
      window.alert('Esta cita no está disponible');
      return;
    }
    this.selectedSegment = seg;
    this.showConfirmModal = true;
  }
  confirmReserva() {

    if (!this.currentUser || !this.selectedDayDate || !this.selectedSegment) return;
    const date = this.formatLocalDate(this.selectedDayDate!);
    const time = this.selectedSegment.startTime;
    const dto = {
      usuarioId: this.currentUser.id,
      fechaYHora: `${date}T${time}:00`
    };

    this.citaService.crearCita(dto).subscribe({
      next: () => {
        window.location.reload();
        this.loadMisCitas();
        this.loadMonth();
        this.selectedDaySegments = this.buildSegments(
          this.monthAvailability.find(x => x.fecha === date)?.franjas ?? []
        );
        this.showConfirmModal = false;
      },
      error: err => {
        console.error('Error reservando cita', err);
        window.alert('Tienes un cita Activa');
      }
    });
  }

  cancelReserva() {
    this.showConfirmModal = false;
    this.selectedSegment = null;
  }
  isPastDay(d: Date | null): boolean {
    if (!d) return false;
    const today = new Date();
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  isPastSegment(seg: Segmento): boolean {
    if (!this.selectedDayDate) return false;
    const segDateTime = new Date(`${this.formatLocalDate(this.selectedDayDate)}T${seg.startTime}:00`);
    return segDateTime < new Date();
  }

  hasFullyBooked(d: Date | null): boolean {
    if (!d) return false;
    const pad = (n: number) => n.toString().padStart(2, '0');
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const dia = this.monthAvailability.find(x => x.fecha === iso);
    return !!dia && dia.franjas.every(f => f.estado !== 'DISPONIBLE');
  }




}

import { Component, OnInit } from '@angular/core';
import { HorarioDTO } from '../../../shared/models/horariodto.model';
import { Cita } from '../../../shared/models/cita.model';
import { HorarioService } from '../../services/horario.service';
import { CitaService } from '../../services/cita.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { UsuarioDTO } from '../../../shared/models/usuariodto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { HistorialCitasComponent } from '../historial-citas/historial-citas.component';

@Component({
  selector: 'app-citas-calendar',
  imports: [CommonModule, FormsModule, NavBarComponent, CalendarComponent, HistorialCitasComponent],
  templateUrl: './citas-calendar.component.html',
  styleUrl: './citas-calendar.component.css'
})
export class CitasCalendarComponent {

}


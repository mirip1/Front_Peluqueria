import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../../shared/models/servicio.model';
import { ServiciosService } from '../../services/servicios.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-servicios-list',
  imports: [CommonModule, CurrencyPipe, NavBarComponent],
  templateUrl: './servicios-list.component.html',
  styleUrl: './servicios-list.component.css'
})
export class ServiciosListComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private servicioSvc: ServiciosService) {}

  ngOnInit(): void {
    this.servicioSvc.getAll()
      .subscribe((list: Servicio[]) => {
        this.servicios = list;
      }, err => {
        console.error('Error cargando servicios', err);
      });
  }
}

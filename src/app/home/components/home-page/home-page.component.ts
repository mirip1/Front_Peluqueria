import { Component, OnInit } from '@angular/core';
import { Peluqueria } from '../../../shared/models/peluqueria.model';
import { HomeService } from '../../services/home.service';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [NavBarComponent, CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  peluqueria: Peluqueria | null = null;

  slides = [
    'assets/images/pelado1.jpg',
    'assets/images/pelado2.jpg',
    'assets/images/pelado3.jpg'
  ];
  currentSlide = 0;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getPeluqueria().subscribe(p => this.peluqueria = p);
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000);
  }
}


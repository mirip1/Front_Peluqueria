import { Component, OnInit } from '@angular/core';
import { Peluqueria } from '../../../shared/models/peluqueria.model';
import { HomeService } from '../../services/home.service';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  imports: [NavBarComponent, CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  peluqueria: Peluqueria | null = null;
  mapUrl?: SafeResourceUrl;

  slides = [
    'assets/images/pelado1.jpg',
    'assets/images/pelado2.jpg',
    'assets/images/pelado3.jpg'
  ];
  currentSlide = 0;

  private readonly googleApiKey = '${API_GOOGLE}';

  constructor(private homeService: HomeService, private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    const recargar = sessionStorage.getItem('recargado');

    this.homeService.getPeluqueria().subscribe(p => {
      this.peluqueria = p;
      this.updateMapUrl();
    });
    if (!recargar) {
      sessionStorage.setItem('recargado', 'true');
      window.location.reload();
    }

    this.startCarousel();

  }

  startCarousel() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000);

  }
    private updateMapUrl() {
    if (!this.peluqueria?.ubicacion) {
      this.mapUrl = undefined;
      console.log(this.peluqueria?.ubicacion);
      return;
    }
    const encoded = encodeURIComponent(this.peluqueria.ubicacion);
    const url = `https://www.google.com/maps/embed/v1/place?key=${this.googleApiKey}&q=${encoded}`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}


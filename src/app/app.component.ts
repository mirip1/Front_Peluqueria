import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private auth: AuthService) {
    this.auth.init();
  }
}

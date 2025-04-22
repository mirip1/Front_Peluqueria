import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}

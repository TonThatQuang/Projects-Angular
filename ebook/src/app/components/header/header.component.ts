import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userName$: Observable<string | null>;
  searchTerm: string = '';
  isMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.userName$ = this.authService.user$;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = ''; // Restore scrolling when menu is closed
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search', this.searchTerm]);
      if (this.isMenuOpen) {
        this.toggleMenu(); // Close menu after search on mobile
      }
    }
  }
}

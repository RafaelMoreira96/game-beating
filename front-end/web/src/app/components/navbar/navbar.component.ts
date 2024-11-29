import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
  role: string = '';

  menuItemsPlayer = [
    { link: '/game-beaten-list', name: 'Lista de jogos zerados' },
    { link: '/register-game', name: 'Cadastrar jogo' },
    { link: '/about-project', name: 'Sobre o projeto' },
    { link: '/project-updates-log', name: 'Log de atualizações' },
  ];

  menuItemsAdmin = [
    { link: 'dashboard', name: 'Dashboard' },
    { link: 'register-log', name: 'Registrar log' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.role = this.auth.getUserRole() ?? '';
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

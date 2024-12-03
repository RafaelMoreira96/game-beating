import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  role: string = '';

  menuItemsPlayer = [
    { link: 'game-beaten-list', name: 'Lista de jogos zerados' },
    { link: 'register-game', name: 'Cadastrar jogo' },
    { link: 'about-project', name: 'Sobre o projeto' },
    { link: 'project-updates-log', name: 'Log de atualizações' },
  ];

  menuItemsAdmin = [
    { link: 'dashboard', name: 'Dashboard' },
    { link: 'register-user', name: 'Registrar usuário' },
    { link: 'register-log', name: 'Registrar log' },
    { link: 'register-genre', name: 'Registrar gênero' },
    { link: 'register-console', name: 'Registrar console' },
    { link: 'register-manufacturer', name: 'Registrar fabricante' },
    { link: 'list-logs', name: 'Listar logs' },
    { link: 'list-genre', name: 'Listar gêneros' },
    { link: 'list-console', name: 'Listar consoles' },
    { link: 'list-manufacturer', name: 'Listar fabricantes' },
    { link: 'list-user', name: 'Listar usuários' },
    { link: 'profile', name: 'Perfil' },
    { link: 'csv-mode', name: 'Modo CSV' },
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

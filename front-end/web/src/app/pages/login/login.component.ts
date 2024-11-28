import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';  // Import NgForm para validação

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  nickname: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  logar(form: NgForm): void {
    if (form.invalid) {
      this.toastr.warning('Por favor, preencha todos os campos corretamente.', 'Aviso');
      return;
    }

    this.authService.authenticate(this.nickname, this.password).subscribe({
      next: (resposta) => {
        const token = resposta.body?.token;  // Se o responseType é 'json', pega direto
        
        if (token) {
          this.authService.successfulLogin(token);
          this.router.navigate(['home']);
          this.toastr.success('Bem-vindo, Usuário!', 'Login realizado', { timeOut: 3000 });
        } else {
          this.toastr.error('Token inválido ou não recebido.', 'Erro de autenticação');
        }
      },
      error: (error) => {
        console.error('Erro no login:', error);
        const errorMessage = error.error?.message || 'Erro desconhecido.';
        this.toastr.error(errorMessage, 'Erro ao logar');
      }
    });
  }
}

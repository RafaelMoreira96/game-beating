import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRole = route.data['role']; // Pega o papel exigido da rota
    const userRole = this.authService.getUserRole(); // Pega o papel do usuário

    if (userRole && userRole === requiredRole) {
      return true;
    } else {
      this.router.navigate(['login']); // Redireciona para login se não tiver acesso
      return false;
    }
  }
}

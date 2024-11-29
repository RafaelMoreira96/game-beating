import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/player/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GameBeatenListComponent } from './pages/player/game-beaten-list/game-beaten-list.component';
import { RegisterGameComponent } from './pages/player/register-game/register-game.component';
import { AboutProjectComponent } from './pages/player/about-project/about-project.component';
import { ProjectUpdatesLogComponent } from './pages/player/project-updates-log/project-updates-log.component';
import { LogComponent } from './pages/admin/registers/log/log.component';
import { RoleGuard } from './auth/role.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { PlayerLoginComponent } from './pages/login/player-login/player-login.component';
import { AdminLoginComponent } from './pages/login/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: PlayerLoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },

  // Player routes
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'player' },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'game-beaten-list', component: GameBeatenListComponent },
      { path: 'register-game', component: RegisterGameComponent },
      { path: 'about-project', component: AboutProjectComponent },
      { path: 'project-updates-log', component: ProjectUpdatesLogComponent },
    ],
  },

  // Admin routes
  {
    path: 'admin',
    component: NavbarComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'register-log', component: LogComponent },
    ],
  },

  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

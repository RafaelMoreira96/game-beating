import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/player/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GameBeatenListComponent } from './pages/player/game-beaten-list/game-beaten-list.component';
import { RegisterGameComponent } from './pages/player/register-game/register-game.component';
import { AboutProjectComponent } from './pages/player/about-project/about-project.component';
import { ProjectUpdatesLogComponent } from './pages/player/project-updates-log/project-updates-log.component';
import { RegisterLogComponent } from './pages/admin/log/register-log/register-log.component';
import { RoleGuard } from './auth/role.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { PlayerLoginComponent } from './pages/login/player-login/player-login.component';
import { AdminLoginComponent } from './pages/login/admin-login/admin-login.component';
import { RegisterConsoleComponent } from './pages/admin/console/register-console/register-console.component';
import { RegisterGenreComponent } from './pages/admin/genre/register-genre/register-genre.component';
import { RegisterManufacturerComponent } from './pages/admin/manufacturer/register-manufacturer/register-manufacturer.component';
import { RegisterUserComponent } from './pages/admin/user/register-user/register-user.component';
import { ListLogComponent } from './pages/admin/log/list-log/list-log.component';
import { ListConsoleComponent } from './pages/admin/console/list-console/list-console.component';
import { ListGenreComponent } from './pages/admin/genre/list-genre/list-genre.component';
import { ListManufacturerComponent } from './pages/admin/manufacturer/list-manufacturer/list-manufacturer.component';
import { ListUserComponent } from './pages/admin/user/list-user/list-user.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { CsvModeComponent } from './pages/admin/csv-mode/csv-mode.component';

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

      { path: 'register-log', component: RegisterLogComponent },
      { path: 'register-console', component: RegisterConsoleComponent },
      { path: 'register-console/:id_console', component: RegisterConsoleComponent },
      { path: 'register-genre', component: RegisterGenreComponent },
      { path: 'register-genre/:id_genre', component: RegisterGenreComponent }, 
      { path: 'register-manufacturer', component: RegisterManufacturerComponent},
      { path: 'register-manufacturer/:id_manufacturer', component: RegisterManufacturerComponent},
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'register-user/:id_admin', component: RegisterUserComponent },

      { path: 'list-logs', component: ListLogComponent },
      { path: 'list-console', component: ListConsoleComponent },
      { path: 'list-genre', component: ListGenreComponent },
      { path: 'list-manufacturer', component: ListManufacturerComponent },
      { path: 'list-user', component: ListUserComponent },

      { path: 'profile', component: ProfileComponent },
      { path: 'csv-mode', component: CsvModeComponent },
    ],
  },

  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GameBeatenListComponent } from './pages/game-beaten-list/game-beaten-list.component';
import { RegisterGameComponent } from './pages/register-game/register-game.component';
import { AboutProjectComponent } from './pages/about-project/about-project.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'game-beaten-list', component: GameBeatenListComponent },
      { path: 'register-game', component: RegisterGameComponent },
      { path: 'about-project', component: AboutProjectComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

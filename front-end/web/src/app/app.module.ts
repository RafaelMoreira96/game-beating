import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/player/home/home.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GameBeatenListComponent } from './pages/player/game-beaten-list/game-beaten-list.component';
import { RegisterGameComponent } from './pages/player/register-game/register-game.component';
import { AboutProjectComponent } from './pages/player/about-project/about-project.component';
import { ProjectUpdatesLogComponent } from './pages/player/project-updates-log/project-updates-log.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GenreComponent } from './pages/admin/registers/genre/genre.component';
import { ConsoleComponent } from './pages/admin/registers/console/console.component';
import { ManufacturerComponent } from './pages/admin/registers/manufacturer/manufacturer.component';
import { LogComponent } from './pages/admin/registers/log/log.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { PlayerLoginComponent } from './pages/login/player-login/player-login.component';
import { AdminLoginComponent } from './pages/login/admin-login/admin-login.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerLoginComponent,
    HomeComponent,
    NavbarComponent,
    GameBeatenListComponent,
    RegisterGameComponent,
    AboutProjectComponent,
    ProjectUpdatesLogComponent,
    GenreComponent,
    ConsoleComponent,
    ManufacturerComponent,
    LogComponent,
    DashboardComponent,
    AdminLoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

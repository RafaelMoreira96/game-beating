import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-beaten-list',
  templateUrl: './game-beaten-list.component.html',
  styleUrl: './game-beaten-list.component.css',
})
export class GameBeatenListComponent implements OnInit {
  games: Game[] = [];
  constructor(private service: GameService) {}


  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.service.getGames().subscribe(
      (result: any) => {
        this.games = result;
        console.log(this.games);
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
}

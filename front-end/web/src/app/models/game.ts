export class Game {
  id_game: number;
  name_game: string;
  developer: string;
  genre_id: number;
  console_id: number;
  date_beating: string;
  time_beating: number;
  release_year: string;
  player_id: number;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id_game = 0;
    this.name_game = '';
    this.developer = '';
    this.genre_id = 0;
    this.console_id = 0;
    this.date_beating = '';
    this.time_beating = 0;
    this.release_year = '';
    this.player_id = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

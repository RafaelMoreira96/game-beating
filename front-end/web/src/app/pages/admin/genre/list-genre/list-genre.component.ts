import { Component } from '@angular/core';
import { Genre } from '../../../../models/genre';
import { GenreService } from '../../../../services/genre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-genre',
  templateUrl: './list-genre.component.html',
  styleUrls: ['./list-genre.component.css'],
})
export class ListGenreComponent {
  genreList: Genre[] = [];

  constructor(private service: GenreService, private router: Router) {}

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.service.getGenres().subscribe(
      (result: any) => {
        this.genreList = result;
        console.log(this.genreList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeGenre(id: number) {
    this.service.deleteGenre(id).subscribe(
      (result: any) => {
        console.log('Gênero removido com sucesso');
        this.getGenres();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editGenre(genre: Genre) {
    this.router.navigate(['admin/register-genre/', genre.id_genre]);
  }
}

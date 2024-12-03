import { Component, OnInit } from '@angular/core';
import { Genre } from '../../../../models/genre';
import { GenreService } from '../../../../services/genre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-genre',
  templateUrl: './register-genre.component.html',
  styleUrls: ['./register-genre.component.css'],
})
export class RegisterGenreComponent implements OnInit {
  genre: Genre = new Genre();
  isEditing: boolean = false;

  constructor(
    private genreService: GenreService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idGenre = this.route.snapshot.paramMap.get('id_genre');
    if (idGenre) {
      this.isEditing = true;
      this.getGenre(+idGenre);
    }
  }

  getGenre(id: number): void {
    this.genreService.getGenre(id).subscribe(
      (genre: any) => {
        this.genre = genre;
      },
      (error) => {
        this.toastr.error('Erro ao carregar os dados do gênero.', 'Erro');
      }
    );
  }

  registerGenre(): void {
    if (this.isEditing) {
      this.updateGenre();
    } else {
      this.createGenre();
    }
    this.router.navigate(['/admin/list-genre']);
  }

  createGenre(): void {
    this.genreService.createGenre(this.genre).subscribe(
      (resp) => {
        this.toastr.success('Gênero cadastrado com sucesso!', 'Sucesso');
        this.genre = new Genre();
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar gênero.', 'Erro');
      }
    );
  }

  updateGenre(): void {
    this.genreService.updateGenre(this.genre.id_genre, this.genre).subscribe(
      (resp) => {
        this.toastr.success('Gênero atualizado com sucesso!', 'Sucesso');
      },
      (error) => {
        this.toastr.error('Erro ao atualizar gênero.', 'Erro');
      }
    );
  }
}

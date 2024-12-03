import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Console } from '../../../../models/console';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { Manufacturer } from '../../../../models/manufacturer';
import { ConsoleService } from '../../../../services/console.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-console',
  templateUrl: './register-console.component.html',
  styleUrl: './register-console.component.css',
})
export class RegisterConsoleComponent implements OnInit {
  console: Console = new Console();
  isEditing: boolean = false;

  name_console: string = '';
  manufacturer_id: number = 0;
  release_date: string = '';
  selectedManufacturer: number | undefined;
  manufacturers: Manufacturer[] = [];

  constructor(
    private manufacturerService: ManufacturerService,
    private consoleService: ConsoleService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idConsole = this.route.snapshot.paramMap.get('id_console');
    if(idConsole) {
      this.isEditing = true;
      this.getConsole(+idConsole);
    }
    this.loadManufacturer();
  }

  getConsole(id: number): void {
    this.consoleService.getConsole(id).subscribe(
      (data: any) => {
        this.console = data;
        this.name_console = this.console.name_console;
        this.selectedManufacturer = this.console.manufacturer_id;
        this.release_date = this.console.release_date;
      },
      (error) => {
        this.toastr.error('Erro ao carregar os dados do console.', 'Erro');
      },
    );
  }

  loadManufacturer(): void {
    this.manufacturerService.getManufacturers().subscribe({
      next: (data: any) => {
        this.manufacturers = data;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar consoles.', 'Erro');
      },
    });
  }

  registerConsole(): void {
    if (this.isEditing) {
      this.updateConsole();
    } else {
      this.createConsole();
    }
    this.router.navigate(['/admin/list-console']);
  }
  
  createConsole(): void {
    this.console = {
      id_console: 0,
      name_console: this.name_console,
      manufacturer_id: Number(this.selectedManufacturer),
      release_date: this.release_date.toString(),
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.consoleService.createConsole(this.console).subscribe(
      (resp) => {
        this.toastr.success('Console cadastrado com sucesso!', 'Sucesso');
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar o console.', 'Erro');
      }
    );
  }

  updateConsole(): void {
    this.console.name_console = this.name_console;
    this.console.manufacturer_id = Number(this.selectedManufacturer);
    this.console.release_date = this.release_date.toString();
    this.consoleService.updateConsole(this.console.id_console, this.console).subscribe(
      (resp) => {
        this.toastr.success('Console atualizado com sucesso!', 'Sucesso');
      },
      (error) => {
        this.toastr.error('Erro ao atualizar o console.', 'Erro');
      }
    );
  }
}

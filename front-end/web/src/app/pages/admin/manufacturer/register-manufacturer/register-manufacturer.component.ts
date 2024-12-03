import { Component, OnInit } from '@angular/core';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import { Manufacturer } from '../../../../models/manufacturer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-manufacturer',
  templateUrl: './register-manufacturer.component.html',
  styleUrl: './register-manufacturer.component.css',
})
export class RegisterManufacturerComponent implements OnInit {
  manufacturer: Manufacturer = new Manufacturer();
  isEditing: boolean = false;

  /* name_manufacturer: string = '';
  year_founded: number = 0;
  is_active: boolean = true; */

  constructor(
    private manufacturerService: ManufacturerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idManufacturer = this.route.snapshot.paramMap.get('id_manufacturer');
    if (idManufacturer) {
      this.isEditing = true;
      this.getManufacturer(+idManufacturer);
    }
  }

  getManufacturer(id: number): void {
    this.manufacturerService.getManufacturer(id).subscribe(
      (manufacturer: any) => {
        this.manufacturer = manufacturer;
      },
      (error) => {
        this.toastr.error('Erro ao carregar os dados do fabricante.', 'Erro');
      }
    );
  }

  registerManufacturer(): void {
    this.manufacturer.year_founded = Number(this.manufacturer.year_founded);
    if (this.isEditing) {
      this.updateManufacturer();
    } else {
      this.createManufacturer();
    }
    this.router.navigate(['/admin/list-manufacturer']);
  }

  createManufacturer(): void {
    this.manufacturerService.createManufacturer(this.manufacturer).subscribe(
      (resp) => {
        this.toastr.success('Fabricante cadastrado com sucesso!', 'Sucesso');
        this.manufacturer = new Manufacturer();
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar fabricante.', 'Erro');
      }
    );
  }

  updateManufacturer(): void {
    this.manufacturerService
      .updateManufacturer(this.manufacturer.id_manufacturer, this.manufacturer)
      .subscribe(
        (resp) => {
          this.toastr.success('Fabricante atualizado com sucesso!', 'Sucesso');
        },
        (error) => {
          this.toastr.error('Erro ao atualizar fabricante.', 'Erro');
        }
      );
  }
}

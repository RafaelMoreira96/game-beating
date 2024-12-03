import { Component } from '@angular/core';
import { Manufacturer } from '../../../../models/manufacturer';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-manufacturer',
  templateUrl: './list-manufacturer.component.html',
  styleUrl: './list-manufacturer.component.css',
})
export class ListManufacturerComponent {
  manufacturerList: Manufacturer[] = [];

  constructor(private service: ManufacturerService, private router: Router) {}

  ngOnInit(): void {
    this.getManufacturers();
  }

  getManufacturers() {
    this.service.getManufacturers().subscribe(
      (result: any) => {
        this.manufacturerList = result;
        console.log(this.manufacturerList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeManufacturer(id: number) {
    this.service.deleteManufacturer(id).subscribe(
      (result: any) => {
        console.log('Fabricante removido com sucesso');
        this.getManufacturers();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editManufacturer(manufacturer: Manufacturer) {
    this.router.navigate([
      'admin/register-manufacturer/',
      manufacturer.id_manufacturer,
    ]);
  }
}

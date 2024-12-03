export class Manufacturer {
  id_manufacturer: number;
  name_manufacturer: string;
  year_founded: number;
  is_active: boolean;

  constructor() {
    this.id_manufacturer = 0;
    this.name_manufacturer = '';
    this.year_founded = 0;
    this.is_active = true;
  }
}

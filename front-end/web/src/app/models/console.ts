export class Console {
  id_console: number;
  name_console: string;
  manufacturer_id: number;
  release_date: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id_console = 0;
    this.name_console = '';
    this.manufacturer_id = 0;
    this.release_date = 0;
    this.is_active = true;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export class Genre {
    id_genre: number;
    name_genre: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  
    constructor() {
      this.id_genre = 0;
      this.name_genre = '';
      this.is_active = true;
      this.created_at = new Date();
      this.updated_at = new Date();
    }
  }
  
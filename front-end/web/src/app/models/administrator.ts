export class Administrator {
  id_administrator: number;
  name: string;
  email: string;
  nickname: string;
  password: string;
  access_type: number;
  is_active: boolean;
  created_at: Date;

  constructor() {
    this.id_administrator = 0;
    this.name = '';
    this.email = '';
    this.nickname = '';
    this.password = '';
    this.access_type = 0;
    this.is_active = true;
    this.created_at = new Date();
  }
}

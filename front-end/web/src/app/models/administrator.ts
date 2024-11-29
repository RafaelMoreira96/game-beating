export class Administrator {
  id_administrator: number;
  name: string;
  email: string;
  nickname: string;
  password: string;
  access_type: string;
  is_active: boolean;

  constructor() {
    this.id_administrator = 0;
    this.name = '';
    this.email = '';
    this.nickname = '';
    this.password = '';
    this.access_type = '';
    this.is_active = true;
  }
}

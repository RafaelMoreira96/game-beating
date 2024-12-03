import { Component } from '@angular/core';
import { Administrator } from '../../../../models/administrator';
import { AdministratorService } from '../../../../services/administrator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent {
  adminList: Administrator[] = [];

  constructor(private service: AdministratorService, private router: Router) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.service.getAdministrators().subscribe(
      (result: any) => {
        this.adminList = result;
        console.log(this.adminList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeAdmin(id: number) {
    this.service.deleteAdministrator(id).subscribe(
      (result: any) => {
        console.log('Administrador removido com sucesso');
        this.getAdmins();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editAdmin(admin: Administrator) {
    this.router.navigate(['admin/register-user/', admin.id_administrator]);
  }
}

import { Component } from '@angular/core';
import { Console } from '../../../../models/console';
import { ConsoleService } from '../../../../services/console.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-console',
  templateUrl: './list-console.component.html',
  styleUrl: './list-console.component.css',
})
export class ListConsoleComponent {
  consoleList: Console[] = [];

  constructor(private service: ConsoleService, private router: Router) {}

  ngOnInit(): void {
    this.getConsoles();
  }

  getConsoles() {
    this.service.getConsoles().subscribe(
      (result: any) => {
        this.consoleList = result;
        console.log(this.consoleList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeConsole(id: number) {
    this.service.deleteConsole(id).subscribe(
      (result: any) => {
        console.log('Console removido com sucesso');
        this.getConsoles();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editConsole(console: Console) {
    this.router.navigate(['admin/register-console', console.id_console]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ProjectUpdateLog } from '../../../../models/project-update-log';
import { ProjectUpdateLogService } from '../../../../services/project-update-log.service';

@Component({
  selector: 'app-list-log',
  templateUrl: './list-log.component.html',
  styleUrl: './list-log.component.css',
})
export class ListLogComponent implements OnInit{
  logList: ProjectUpdateLog[] = [];

  constructor(private service: ProjectUpdateLogService) {}

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    this.service.getLogs().subscribe(
      (result: any) => { 
        this.logList = result;
        console.log(this.logList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeLog(id: number) {
    this.service.removeLog(id).subscribe(
      (result: any) => {
        console.log('Log removido com sucesso');
        this.getLogs();
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('Editar log com ID:', id);
    // Implemente a lógica de edição aqui
  }
}

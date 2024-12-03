import { Component, OnInit } from '@angular/core';
import { ProjectUpdateLogService } from '../../../services/project-update-log.service';
import { ProjectUpdateLog } from '../../../models/project-update-log';

@Component({
  selector: 'app-project-updates-log',
  templateUrl: './project-updates-log.component.html',
  styleUrl: './project-updates-log.component.css',
})
export class ProjectUpdatesLogComponent implements OnInit {
  logs: ProjectUpdateLog[] = [];
  
  constructor(private service: ProjectUpdateLogService) {}

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    this.service.getLogs().subscribe(
      (result: any) => {
        this.logs = result.slice(0).reverse();
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

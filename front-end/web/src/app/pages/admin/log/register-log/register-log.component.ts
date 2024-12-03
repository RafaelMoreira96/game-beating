import { Component } from '@angular/core';
import { ProjectUpdateLogService } from '../../../../services/project-update-log.service';
import { ProjectUpdateLog } from '../../../../models/project-update-log';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-log',
  templateUrl: './register-log.component.html',
  styleUrl: './register-log.component.css',
})
export class RegisterLogComponent {
  log: ProjectUpdateLog | undefined;

  description: string = '';
  content: string = '';

  constructor(
    private service: ProjectUpdateLogService,
    private toastr: ToastrService
  ) {}

  registerLog(): void {
    this.log = {
      content: this.content,
      description: this.description,
      author_id: 0,
      id_project_update_log: 0
    }

    this.service.registerLog(this.log).subscribe(
      (resp) => {
        this.toastr.success('Log inserido com sucesso', 'Sucesso');
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar log.', 'Erro');
      }
    );
  }
}

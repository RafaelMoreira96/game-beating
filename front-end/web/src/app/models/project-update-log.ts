import { Administrator } from "./administrator";

export class ProjectUpdateLog {
    id_project_update_log: number;
    description: string;
    author_id: number;
    administrator?: Administrator;
    content: string;

    constructor() {
        this.id_project_update_log = 0;
        this.description = '';
        this.author_id = 0;
        this.content = '';
        this.administrator = new Administrator;
    }
  }
  
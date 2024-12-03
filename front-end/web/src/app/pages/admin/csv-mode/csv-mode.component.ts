import { Component } from '@angular/core';

@Component({
  selector: 'app-csv-mode',
  templateUrl: './csv-mode.component.html',
  styleUrl: './csv-mode.component.css',
})
export class CsvModeComponent {
  activeTab: string = 'genero'; // Aba padrão ativa
  selectedFiles: { [key: string]: File | null } = {
    genero: null,
    fabricante: null,
  };

  onFileSelected(event: Event, tipo: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFiles[tipo] = inputElement.files[0];
    }
  }

  onSubmitGenero(): void {
    if (this.selectedFiles['genero']) {
      this.readCsv(this.selectedFiles['genero']);
    }
  }

  onSubmitFabricante(): void {
    if (this.selectedFiles['fabricante']) {
      this.readCsv(this.selectedFiles['fabricante']);
    }
  }

  /* processCsv(file: File | null, tipo: string): void {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }

    if (file) {
      console.log(`Processando CSV de ${tipo}:`, file.name);
    }
  } */

  readCsv(file: File | null): void {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file); // Lê o arquivo como texto

      reader.onload = () => {
        const csvContent = reader.result as string;
        const rows = csvContent.split('\n'); // Divide o conteúdo em linhas

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i].trim(); // Remove espaços extras
          if (row) {
            // Evita linhas vazias
            const columns = row.split(','); // Divide a linha em colunas usando vírgula como delimitador
            console.log(`Linha ${i + 1}:`, columns);
            // Aqui você pode processar cada coluna individualmente, por exemplo:
            // const name = columns[0];
            // const age = columns[1];
          }
        }
      };

      reader.onerror = () => {
        console.error('Erro ao ler o arquivo CSV');
      };
    }
  }
}

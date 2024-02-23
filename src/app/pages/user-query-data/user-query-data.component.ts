import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDadosPessoas } from 'src/app/model/PersonData.model';
import { PessoasService } from 'src/app/services/pessoas.service';

@Component({
  selector: 'app-user-query-data',
  templateUrl: './user-query-data.component.html',
  styleUrls: ['./user-query-data.component.css'],
})
export class UserQueryDataComponent {
  cpf: string = '';
  showUserData: boolean = false;
  userDataList: IDadosPessoas;

  constructor(
    private readonly pessoaService: PessoasService,
    private snackBar: MatSnackBar
  ) {}

  searchUser() {
    this.pessoaService.getUserByCpf(this.cpf).subscribe({
      next: (res: any) => {
        if (!res) {
          this.snackBar.open('Usuário não existe', '', { duration: 5000 });
        } else {
          this.userDataList = res;
          this.showUserData = true;
        }
      },
      error: (e) => {
        this.showUserData = false;
        this.snackBar.open(e.error, '', { duration: 5000 });
      },
    });
  }
}

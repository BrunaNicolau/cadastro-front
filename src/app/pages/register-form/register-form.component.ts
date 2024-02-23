import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IDadosPessoas } from 'src/app/model/PersonData.model';
import { PessoasService } from 'src/app/services/pessoas.service';
import { validateEmail } from 'src/app/shared/validators/email.validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  pessoas: IDadosPessoas[] = [];
  newUserForm: FormGroup;
  genderOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
  ];

  constructor(
    private readonly pessoaService: PessoasService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newUserForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [validateEmail()],
        updateOn: 'change',
      }),

      celular: new FormControl(''),
    });
  }

  confirm() {
    if (this.newUserForm.valid) {
      const req: IDadosPessoas = this.newUserForm.value;
      this.pessoaService.registerUser(req).subscribe({
        next: (res: IDadosPessoas) => {
          console.log(res);
          this.snackBar.open('Cadastrado com sucesso', '', { duration: 5000 });
        },
        error: (e) => {
          this.snackBar.open(e.error, '', { duration: 5000 });
        },
      });
    }
  }

  goPesquisa(){
    this.router.navigate(['/userQuery']);
  }
}

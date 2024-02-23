import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PessoasService } from 'src/app/services/pessoas.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppMaterialModule } from 'src/app/shared/angular-material/ngMaterial.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { IDadosPessoas } from 'src/app/model/PersonData.model';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let router: Router;
  let pessoaService: jasmine.SpyObj<PessoasService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  const userData: IDadosPessoas = {
    
    nome: 'Maria',
    sexo: 'F',
    cpf: '98765432109',
    email: 'maria@example.com',
    celular: '8888888888',
  };

  const successResponse = {
    id: 2,
    nome: 'Maria',
    sexo: 'F',
    cpf: '98765432109',
    email: 'maria@example.com',
    celular: '8888888888',
  };

  beforeEach(() => {
    const pessoaServiceSpy = jasmine.createSpyObj('PessoasService', [
      'registerUser',
    ]);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        AppMaterialModule,
        HttpClientModule,
        FormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
        BrowserAnimationsModule,
      ],
      providers: [
        provideNgxMask(),
        { provide: PessoasService, useValue: pessoaServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
    pessoaService = TestBed.inject(
      PessoasService
    ) as jasmine.SpyObj<PessoasService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initForm method on ngOnInit', () => {
    spyOn(component, 'initForm');
    component.ngOnInit();
    expect(component.initForm).toHaveBeenCalled();
  });

  it('should initialize newUserForm correctly', () => {
    component.initForm();

    expect(component.newUserForm).toBeTruthy();
    expect(component.newUserForm instanceof FormGroup).toBe(true);

    expect(component.newUserForm.controls['nome']).toBeTruthy();
    expect(component.newUserForm.controls['sexo']).toBeTruthy();
    expect(component.newUserForm.controls['cpf']).toBeTruthy();
    expect(component.newUserForm.controls['email']).toBeTruthy();
    expect(component.newUserForm.controls['celular']).toBeTruthy();
  });

  it('should call registerUser and show success snackbar if form is valid', () => {
    component.newUserForm.setValue(userData);
    pessoaService.registerUser.and.returnValue(of(successResponse));
    component.confirm();
    expect(pessoaService.registerUser).toHaveBeenCalledWith(userData);
    expect(snackBar.open).toHaveBeenCalledWith('Cadastrado com sucesso', '', {
      duration: 5000,
    });
  });

  it('should show error snackbar if registerUser fails', () => {
    const errorResponse = { error: 'Some error message' };

    component.newUserForm.setValue(userData);
    pessoaService.registerUser.and.returnValue(throwError(() => errorResponse));
    component.confirm();
    expect(pessoaService.registerUser).toHaveBeenCalledWith(userData);
    expect(snackBar.open).toHaveBeenCalledWith(errorResponse.error, '', {
      duration: 5000,
    });
  });

  it('should navigate to userQuery route', () => {
    component.goPesquisa();
    expect(router.navigate).toHaveBeenCalledWith(['/userQuery']);
  });
});

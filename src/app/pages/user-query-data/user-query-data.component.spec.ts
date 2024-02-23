import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserQueryDataComponent } from './user-query-data.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PessoasService } from 'src/app/services/pessoas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppMaterialModule } from 'src/app/shared/angular-material/ngMaterial.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('UserQueryDataComponent', () => {
  let component: UserQueryDataComponent;
  let fixture: ComponentFixture<UserQueryDataComponent>;
  let pessoaService: jasmine.SpyObj<PessoasService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  const userData = {
    id: 2,
    nome: 'Maria',
    sexo: 'F',
    cpf: '98765432109',
    email: 'maria@example.com',
    celular: '8888888888',
  };

  beforeEach(() => {
    const pessoaServiceSpy = jasmine.createSpyObj('PessoasService', [
      'getUserByCpf',
    ]);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      declarations: [UserQueryDataComponent],
      imports: [
        AppMaterialModule,
        HttpClientModule,
        NgxMaskDirective,
        NgxMaskPipe,
        BrowserAnimationsModule,
        FormsModule,
      ],
      providers: [
        provideNgxMask(),
        { provide: PessoasService, useValue: pessoaServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQueryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pessoaService = TestBed.inject(
      PessoasService
    ) as jasmine.SpyObj<PessoasService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userDataList and showUserData when user is found', () => {
    pessoaService.getUserByCpf.and.returnValue(of(userData));

    component.cpf = '123456789';

    component.searchUser();

    expect(pessoaService.getUserByCpf).toHaveBeenCalledWith('123456789');
    expect(component.userDataList).toEqual(userData);
    expect(component.showUserData).toBeTrue();
    expect(snackBar.open).not.toHaveBeenCalled();
  });

  it('should show snackbar if user is not found', () => {
    component.cpf = '123456789';
    pessoaService.getUserByCpf.and.returnValue(of(null)); 
  
    component.searchUser();
  
    expect(pessoaService.getUserByCpf).toHaveBeenCalledWith('123456789');
    expect(component.userDataList).toBeUndefined(); 
    expect(component.showUserData).toBeFalse(); 
    expect(snackBar.open).toHaveBeenCalledWith('Usuário não existe', '', { duration: 5000 });
  });

  it('should show error snackbar if registerUser fails', () => {
    const errorResponse = { error: 'Some error message' };
    component.cpf = '';
    pessoaService.getUserByCpf.and.returnValue(throwError(() => errorResponse));
    component.searchUser();
    expect(pessoaService.getUserByCpf).toHaveBeenCalledWith('');
    expect(snackBar.open).toHaveBeenCalledWith(errorResponse.error, '', {
      duration: 5000,
    });
  });
});

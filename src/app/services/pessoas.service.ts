import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IDadosPessoas } from '../model/PersonData.model';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  constructor(private readonly http: HttpClient) {}

  getAllUser(): Observable<IDadosPessoas[]> {
    return this.http
      .get<IDadosPessoas[]>('/api/todasPessoas')
      .pipe(map((res: any) => res as any));
  }

  registerUser(req: IDadosPessoas): Observable<IDadosPessoas> {
    return this.http
      .post<IDadosPessoas[]>('/api/cadastro', req)
      .pipe(map((res: any) => res as any));
  }

  getUserByCpf(cpf: string): Observable<any> {
    return this.http
      .get<IDadosPessoas[]>('/api/pessoa/' + cpf)
      .pipe(map((res: any) => res as any));
  }
}

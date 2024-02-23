import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PessoasService {

    constructor(
        private readonly http: HttpClient
    ) { }

    get(): Observable<IDadosPessoas[]> {
        return this.http.get<IDadosPessoas[]>('/api/pessoas/')
            .pipe(
                catchError((err) => {
                    return throwError(() => err)
                }),
            );
    }
}

export interface IDadosPessoas {
    nome: string;
    cpf: string;
    sexo: string;
    email: string;
    celular: string;
}

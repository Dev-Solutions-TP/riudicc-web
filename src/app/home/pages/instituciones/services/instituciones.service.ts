import { HttpClient } from '@angular/common/http';
import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Institucion, InstitucionResponse } from '../interfaces/aliados.interface';




const API_URL = environment.baseUrl;

interface Options {
    limit?: number;
    offset?: number;

}



@Injectable({ providedIn: 'root' })
export class InstitucionesService {
    constructor() { }


    private http = inject(HttpClient);





    getInstituciones(option: Options): Observable<InstitucionResponse> {
        const { limit = 8, offset = 0 } = option;

        return this.http.get<InstitucionResponse>(`${API_URL}/instituciones`, {
            params: {
                limit,
                offset,
            },
        }).pipe(

            tap((response) => console.log('Response:', response)),
        );
    }


    getInstitucionByIdSlug(idSlug: string): Observable<Institucion> {


        return this.http.get<Institucion>(`${API_URL}/instituciones/${idSlug}`, {});
    }

}
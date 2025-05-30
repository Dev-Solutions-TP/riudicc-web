import { HttpClient } from '@angular/common/http';
import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstitucionEntity, InstitucionResponse } from '../interfaces/aliados.interface';




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


    getInstitucionByIdSlug(idSlug: string): Observable<InstitucionEntity> {


        return this.http.get<InstitucionEntity>(`${API_URL}/instituciones/${idSlug}`, {});
    }

}